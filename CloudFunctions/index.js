const functions = require("firebase-functions");
const admin = require('firebase-admin');

admin.initializeApp();




const randomCharacter =   () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const index = Math.floor(Math.random() * chars.length);
  return chars[index];
}

exports.createOrder = functions.https.onCall(async (rawData , context) => {
  if (!context.auth || !rawData.userPhoneNumber || !rawData.shipingAddress) {
    return Promise.reject({ status: false, message: "You are not authenticated users" })
  }

  const asyncReduce = async (arr , cb , initialValue) =>{
    let accumulator = initialValue !== undefined ? initialValue : arr[0];
    for (const item of arr) {
      accumulator = await cb(accumulator, item);
    }
    return accumulator;
  }


  // get Addons Tottal function start
  const getAddonsTottal = async (AddonsIds) => {
    let addonsTottal = await asyncReduce( AddonsIds , async (acc, id) => {
      const AddonsDocs = await admin.firestore().collection('Addons').doc(id).get();
      const data = AddonsDocs.data()
      if (data) {
        acc = await acc + Number(data.price)
      }
      return await acc
    }, 0)
    return addonsTottal
  }
  // get Addons Tottal function End


  //  get ItemVariant Price function start 
  const getItemVariantPrice = async (docID, selectedVariantID) => {
    const productRef = admin.firestore().collection('productlist').doc(docID)
    const productsDocs = await productRef.get()

    if (!productsDocs.exists) throw new Error({ status: false, message: "Can't Find The Product" })

    const data = productsDocs.data()

    const item = data.variants[`${selectedVariantID}`];
    return Number(item.sellingPrice)

  }
  //  get ItemVariant Price function end


  // get Discount Ammount function start 
  const getDiscountAmmount = async (promoCode, subTottal) => {
    if(!promoCode){
      return 0
    }

    const promoDataDos = await admin.firestore().collection('promoCode').doc(promoCode).get()

    if (!promoDataDos.exists) return 0;

    const promoData = promoDataDos.data()
    if (Number(promoData.conditionAmmount) > subTottal) {
      throw new Error({ status: false, message: "You are Manipulating Your order" })
    }

    if (promoData.discountType === "taka") {
      return Number(promoData.discountValue)
    } else {
      return (subTottal / 100) * Number(promoData.discountValue)
    }


  }
  // get Discount Ammount function end 



  // get ExtraCost Ammount function start 
  const getExtraCostAmmount = async (subTottal) => {

    const extraCostRef =  admin.firestore().collection('extraCost')
    const extraCostCollection =  await extraCostRef.get()
    const extraCostDocs =  extraCostCollection.docs
    let exTraCost = 0
    if (extraCostDocs.length > 0) {
      extraCostDocs.map((doc) => {
        const data = doc.data()
        if (data.costType === "taka") {
          exTraCost = exTraCost + Number(data.costValue)
        } else {
          const temp = (subTottal / 100) * Number(data.costValue)
          exTraCost = exTraCost + temp
        }
      })
    }
    return exTraCost
  }
  //get ExtraCost Ammount function end


  //   items Tottal Ammount function start 
  const itemsTotalAmmount = async (ids, rawData) => {
    const itemsTotalReturn = await asyncReduce( ids ,async (acc, v) => {
      let ItemsTottal = 0;
      const doc = rawData.items[`${v}`]

      let temp = await getItemVariantPrice(doc.id, doc.selectedVariant.id)
      ItemsTottal = ItemsTottal + temp

      temp = await getAddonsTottal(Object.keys(doc.selectedAddonsForCard))
      ItemsTottal = ItemsTottal + temp

      ItemsTottal = (Number(ItemsTottal) * Number(doc.itemCount))
      acc = await acc + ItemsTottal
      return await acc
    }, 0)
    return itemsTotalReturn;
  }
  //   items Tottal Ammount function end



  // functions main Theme Start 
  try {
    const subTottal = await itemsTotalAmmount(Object.keys(rawData.items), rawData);
    const exTraCost = await getExtraCostAmmount(subTottal);
    const discount = rawData.promoCode ? await getDiscountAmmount(rawData.promoCode, subTottal) : 0;
    console.log("discount" , discount);
    if (Number(rawData.TotalOrderAmmount) === ((subTottal + exTraCost) - discount)) {

      rawData.creationTime = Date.now()
      rawData.status = "pending";
      
      const TotalOrdersDoc = await admin.firestore().collection('totalSummery').doc('totalOrder').get()
      const TotalOrderData = TotalOrdersDoc.data()
      let temId;
      if(!TotalOrderData){
        await admin.firestore().collection('totalSummery').doc('totalOrder').set({
          "count" : 1
        })
        temId = 0;
        console.log("I am GEr")
      }else{
        temId = TotalOrderData.count;
        await admin.firestore().collection('totalSummery').doc('totalOrder').update({
          "count" : admin.firestore.FieldValue.increment(1)
        })
      }
      const thisOrderID = `${randomCharacter()}#${rawData.userPhoneNumber.slice(-3)}-${temId}` 
      rawData.id = thisOrderID

      await admin.firestore().collection('ordersList').doc(thisOrderID).set(rawData);

      return Promise.resolve({ status: true, message: "Order Has Created Succesfully" })
    }
    return Promise.reject({ status: false, message: "You are Manipulating Your order" })
    // functions main Theme end
  } catch (error) {
    return Promise.reject({ status: false, message: "You are Manipulating Your order" })
  }
});




exports.makeUserAdmin = functions.https.onCall(async (data) => {
  if (data.superAdminKey !== "753777217A25432A462D4A614E645267") return Promise.reject({ status: false, message: "Invalid SuperUser key" });
  if (!data.email || !data.password) return Promise.reject({ status: false, message: "Haven't Provide email and password" })
  const email = data.email;
  const password = data.password;
  return admin.auth().createUser({
    email: email,
    password: password
  }).then(userRecord => {
    // Return the UID of the newly created user
    const customClaims = {
      admin: true
    };

    return admin.auth().setCustomUserClaims(userRecord.uid, customClaims)
  }).then(()=>{
    return Promise.resolve({status : true , message : "user Created successfuly"})
  })
    .catch(error => {
      // If there was an error, return an error message
      return Promise.reject({ error: error.message });
    });
});

exports.setUsersInfoInDatabase = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    return Promise.reject({ status: false, message: "You are not authenticated users" })
  }
  if (!data.fullName || !data.phoneNumber) {
    return Promise.reject({ status: false, message: "some Data Fields are missed" })
  }
  await admin.firestore().collection("usersList").doc(context.auth.uid).set(data)
  return Promise.resolve({ status: true, message: "succesfully usersCreated" })
})

exports.updateUsersInformation = functions.https.onCall(async (data, context) => {
  if (!context.auth) return Promise.reject({ status: false, message: "You are not authenticated users" });

  if (Object.keys(data).length <= 0) return Promise.reject({ status: false, message: "Some data fields are missed" });
  await admin.firestore().collection("usersList").doc(context.auth.uid).update(data)
  return Promise.resolve({ status: true, message: "succesfully Update Users Profile" })
})

exports.setUsersShipingAddress = functions.https.onCall(async (data, context) => {
  if (!context.auth) return Promise.reject({ status: false, message: "You are not authenticated users" });

  if (!data.shipingAddress) return Promise.reject({ status: false, message: "Some data fields are missed" });
  await admin.firestore().collection("usersList").doc(context.auth.uid).update(data)
  return Promise.resolve({ status: true, message: "succesfully set Shiping Adderes" })
})

