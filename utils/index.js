import { toast } from 'react-toastify';

import {  
   where ,
   deleteDoc ,
   doc,
  setDoc,
  addDoc,
  getDoc,
  getDocs,
  collection,
  onSnapshot,
  query,
  orderBy,
  startAfter,
  limit,
  getCountFromServer } from "firebase/firestore";
import { db , firebaseApp } from "../firebaseConfig";
import { closeLoading, showLoading } from '../src/components/loading/loading';


export const lengthOfCollection = async (collref) =>{
  const coll = collection(db, `${collref}`);
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count
}



export const findDataWithQuries = async (collectionRef , quriesField , qurieskey) => {
  const q = query(collection(db, `${collectionRef}`), where(`${quriesField}` , "==" , `${qurieskey}`) );
  const docSnap = await getDocs(q);
  return new Promise((resolve , reject)=>{
    if (docSnap.docs.length > 0) {
        resolve(docSnap.docs)
    }else{
      reject("SomeThings went worng don't do piracy")
    }
  })
   
}







export const showDataForCurrentOrder = (setState , collectionRef , queryArray , queryField ) => {
  const q = query(collection(db, `${collectionRef}`), where(`${queryField}`, 'in', queryArray));
  onSnapshot(q, (snapshot) => {  
    setState(() => {
      return snapshot.docs
    })
  })

}




export const showDataWithPaginationForItems = async (setState, collectionRef) => {
  onSnapshot((collection(db, `${collectionRef}`)), (snapshot)=>{
    setState(snapshot.docs)
  })
}




export const showDataWithPagination = async (setState, collectionRef, startingPoint, limitation, fristAttemp , orderByFilter ) => {
  const q = query(collection(db, `${collectionRef}`),orderBy(orderByFilter ? orderByFilter : "name")  , startAfter(startingPoint) , limit(limitation) );
  if (fristAttemp) {
    // const snapshot = await getCountFromServer(collection(db, `${collectionRef}`))
    
    onSnapshot(q, (snapshot)=>{
      setState(snapshot.docs)
    })

    const snapshot = await getDocs(collection(db, `${collectionRef}`))
    return snapshot.docs
    
  }
  else{
    onSnapshot(q, (snapshot)=>{
      setState(snapshot.docs)
    })
  }
}





export const getDataForTotalSummery =  async () => {

  const q = query(collection(db, "totalSummery"));
  const rawDoc = await getDocs(q)
  if(rawDoc.docs.length == 0){
    return false;
  }
  const data = {} 
  rawDoc.docs.map((doc)=>{
    data[`${doc.id}`] = doc.data()
  })
  return data
}



export const setDataforTotalSummery = async (items , collectionRef ) => {
  try {
    // delete items["id"]
    await setDoc( collectionRef ,  {...items});

  } catch (e) {

    toast.error("Server Connection Faild ");
  
  }
}







export const showDataWithOutPagination =  (setState, collectionRef) => {

  const q = query(collection(db, `${collectionRef}`));
  const returnPromise = new Promise((resolve , reject)=>{
      onSnapshot(q, (snapshot) => {

      setState(() => {
        return snapshot.docs
      })
      resolve(snapshot.docs.length)
        // //   .forEach(doc => console.log(doc.data()))
    })
  })
  return returnPromise
}

                              

export const getSingleDataWithOutRealTimeUpdates = async (collectionRef , idRef , search) => {
  const docRef = doc(db, `${collectionRef}`, `${idRef}`);
  const docSnap = await getDoc(docRef);
  return new Promise((resolve , reject)=>{
    if (docSnap.exists()) {
      if(search){
        resolve(docSnap)
      }else{
        resolve(docSnap.data())
      }
    }else{
      reject("SomeThings went worng don't do piracy")
    }
  })
   
}


export const showDataByArrayQuers = (setState , collectionRef , queryArray , queryField ) => {
  const q = query(collection(db, `${collectionRef}`), where(`${queryField}`, 'array-contains-any', queryArray));
  // showLoading()
  onSnapshot(q, (snapshot) => {
    
    setState(() => {
      // closeLoading()
      return snapshot.docs
    })
  })

}

const updateByAdmin = doc(db, "totalSummery", "updateByAdmin");


export const addDataToCollection = async (items, collectionRef) => {

  try {
    showLoading()
    const colRef = collection(db, `${collectionRef}`)
    if(await isExist(colRef , items.name)){
      closeLoading()
      toast.error("Data Is Already In the Store");
      return
    }
    await addDoc( colRef , { ...items });
    closeLoading()

     toast.success(`${collectionRef} Created Succesfully!`)
  } catch (e) {
    closeLoading()
    toast.error("Server Connection Faild ");
  }
  setDataforTotalSummery({random : shortUUID()} , updateByAdmin)
}


export const setDataToCollection = async (items, collectionRef, isSingle = true, forceRe = true) => {
  try {
    showLoading()
    console.log(items)
    if(isSingle && await isExist(collection(db, `${collectionRef}`) , items?.name)){
      closeLoading()
      toast.error("Data Is Already In the Store");
      return
    }
    const colRef = doc(db, `${collectionRef}` , `${items.id}`)
    // delete items["id"]
    await setDoc( colRef ,  {...items});
    closeLoading()
     toast.success(`${collectionRef} Update Succesfully!`)
  } catch (e) {
    closeLoading()
     toast.error("Server Connection Faild ");
  }
  if (!forceRe) return;
  setDataforTotalSummery({random : shortUUID()} , updateByAdmin)
}





const isExist = async (colRef , itemsName) =>{
  const q = query(colRef, where("name", "==", itemsName));
  const docSnap = await getDocs(q)
  if(docSnap.docs.length == 0){
    return false
  }
  return true
}

import { getStorage, ref, deleteObject } from "firebase/storage";



export const delteColloctionInstance = async (itemsID, collectionRef, isImageRef, forceRe = true) => {
  try {
    showLoading()
    if(isImageRef){
      const storage = getStorage(firebaseApp);
      const desertRef = ref(storage, `${isImageRef}`);
      await deleteObject(desertRef)
    }
    await deleteDoc(doc(db, `${collectionRef}`, `${itemsID}`));
    closeLoading()
    toast.success(`${collectionRef} Item deleted Succesfully!`)
  } catch (e) {
    closeLoading()
    toast.error("Server Connection Faild ");
  }
  if (!forceRe) return;
  setDataforTotalSummery({random : shortUUID()} , updateByAdmin)
}

export const delteColloctionInstanceWithOutLoadingAnimation = async (itemsID, collectionRef , isImageRef) => {
  try {

    if(isImageRef){
      const storage = getStorage(firebaseApp);
      const desertRef = ref(storage, `${isImageRef}`);
      await deleteObject(desertRef)
    }
    await deleteDoc(doc(db, `${collectionRef}`, `${itemsID}`));
    closeLoading()
    toast.success(`${collectionRef} Item deleted Succesfully!`)
  } catch (e) {
    toast.error("Server Connection Faild ");
  }
  setDataforTotalSummery({random : shortUUID()} , updateByAdmin)
}






export const UUID =   () => {
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}


export const shortUUID =   () => {
  var dt = new Date().getTime();
  var uuid = 'xy-xxx-yxy-xxy'.replace(/[xy]/g, (c) => {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}






// export const showDataWithOutPaginationForCreation = async (collectionRef) => {

//   const q = query(collection(db, `${collectionRef}`));
//   const returnPromise = new Promise((resolve , reject)=>{
//       onSnapshot(q, (snapshot) => {
//       resolve(snapshot.docs)
//         // //   .forEach(doc => console.log(doc.data()))
//     })
//   })
//   return returnPromise
// }



// export const createProductDumy = () =>{
//   showDataWithOutPaginationForCreation("productlist").then((docs)=>{
//     docs.forEach(  (doc) => {
//       const data = doc.data()
//       data.id = `EatPizza-${shortUUID()}`
//       setDataToCollection(data , "productlist" , false)
      
//     });
//   })
// }


// export const FixedProductDumy = () =>{
//   showDataWithOutPaginationForCreation("productlist").then((docs)=>{
//     docs.forEach(  (doc) => {
//       const data = doc.data()
//       // data.id = `EatPizza-${shortUUID()}`
//       let lowestPrice = 100000000000;
//       let defualtVariant = {}
//       Object.keys(data.variants).forEach((key)=>{
//         const variant  =  data.variants[key]
//         if(lowestPrice > variant.sellingPrice){
//           lowestPrice = variant.sellingPrice
//           defualtVariant = {...variant}
//         }
//       })
//       delete data["defualtPrice"]
//       data.defualtVariant = defualtVariant
//       setDataToCollection(data , "productlist" , false)
      
//     });
//   })
// }