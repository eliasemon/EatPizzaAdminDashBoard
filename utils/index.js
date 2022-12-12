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

export const showDataWithOutPagination = (setState, collectionRef) => {
  const q = query(collection(db, `${collectionRef}`));
  onSnapshot(q, (snapshot) => {
    setState(snapshot.docs)
    //   .forEach(doc => console.log(doc.data()))  
  })
}

export const showDataByArrayQuers = (setState , collectionRef , queryArray , queryField ) => {
  const q = query(collection(db, `${collectionRef}`), where(`${queryField}`, 'array-contains-any', queryArray));
  onSnapshot(q, (snapshot) => {
    setState(snapshot.docs)
  })
}

export const addDataToCollection = async (items, collectionRef) => {

  try {
    const colRef = collection(db, `${collectionRef}`)
    if(await isExist(colRef , items.name)){
      toast.error("Data Is Already In the Store");
      return
    }
    await addDoc( colRef , { ...items });
    await toast.success(`${collectionRef} Created Succesfully!`)
  } catch (e) {
    await toast.error("Server Connection Faild ");
  }
}


export const setDataToCollection = async (items , collectionRef , isSingle = true) => {
  try {
    if(isSingle && await isExist(collection(db, `${collectionRef}`) , items.name)){
      toast.error("Data Is Already In the Store");
      return
    }
    const colRef = doc(db, `${collectionRef}` , `${items.id}`)
    await setDoc( colRef , { ...items });
    await toast.success(`${collectionRef} Update Succesfully!`)
  } catch (e) {
    await toast.error("Server Connection Faild ");
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
    await deleteDoc(doc(db, `${collectionRef}`, `${itemsID}`));
    await toast.success(`${collectionRef} Item deleted Succesfully!`)
  } catch (e) {
    await toast.error("Server Connection Faild ");
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