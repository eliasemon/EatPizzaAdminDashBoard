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
  startAt,
  endAt,
  limit } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { closeLoading, showLoading } from '../src/components/loading/loading';
import { async } from '@firebase/util';

export const showDataWithPagination = (setState, collectionRef, startingPoint, limitation, fristAttemp) => {
  const q = query(collection(db, `${collectionRef}`), orderBy("name"), startAt(startingPoint), limit(limitation));
  if (fristAttemp) {
    // getDocs(collection(db, `${collectionRef}`) , (snapshot) => {
    // })
  }
  onSnapshot(q, (snapshot) => {
    setState(prv => ({ ...prv, snapshot: snapshot }))
    //   .forEach(doc => console.log(doc.data()))  
  })
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

                              export const showDataWithOutPaginationForCreation = async (collectionRef) => {

                                const q = query(collection(db, `${collectionRef}`));
                                const returnPromise = new Promise((resolve , reject)=>{
                                    onSnapshot(q, (snapshot) => {
                                    resolve(snapshot.docs)
                                      // //   .forEach(doc => console.log(doc.data()))
                                  })
                                })
                                return returnPromise
                              }



                              export const createProductDumy = () =>{
                                showDataWithOutPaginationForCreation("productlist").then((docs)=>{
                                  docs.forEach(  (doc) => {
                                    const data = doc.data()
                                    data.id = `EatPizza-${shortUUID()}`
                                    setDataToCollection(data , "productlist" , false)
                                    
                                  });
                                })
                              }


                              export const FixedProductDumy = () =>{
                                showDataWithOutPaginationForCreation("productlist").then((docs)=>{
                                  docs.forEach(  (doc) => {
                                    const data = doc.data()
                                    // data.id = `EatPizza-${shortUUID()}`
                                    let lowestPrice = 100000000000;
                                    let defualtVariant = {}
                                    Object.keys(data.variants).forEach((key)=>{
                                      const variant  =  data.variants[key]
                                      if(lowestPrice > variant.sellingPrice){
                                        lowestPrice = variant.sellingPrice
                                        defualtVariant = {...variant}
                                      }
                                    })
                                    delete data["defualtPrice"]
                                    data.defualtVariant = defualtVariant
                                    setDataToCollection(data , "productlist" , false)
                                    
                                  });
                                })
                              }

export const getSingleDataWithOutRealTimeUpdates = async (collectionRef , idRef) => {
  const docRef = doc(db, `${collectionRef}`, `${idRef}`);
  const docSnap = await getDoc(docRef);
  return new Promise((resolve , reject)=>{
    if (docSnap.exists()) {
      resolve(docSnap.data())
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
}


export const setDataToCollection = async (items , collectionRef , isSingle = true) => {
  try {
    showLoading()
    if(isSingle && await isExist(collection(db, `${collectionRef}`) , items.name)){
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
}





const isExist = async (colRef , itemsName) =>{
  const q = query(colRef, where("name", "==", itemsName));
  const docSnap = await getDocs(q)
  if(docSnap.docs.length == 0){
    return false
  }
  return true
}



export const delteColloctionInstance = async (itemsID, collectionRef) => {
  try {
    showLoading()
    await deleteDoc(doc(db, `${collectionRef}`, `${itemsID}`));
    closeLoading()
    toast.success(`${collectionRef} Item deleted Succesfully!`)
  } catch (e) {
    closeLoading()
    toast.error("Server Connection Faild ");
  }
  
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