import { toast } from 'react-toastify';
import {deleteDoc ,doc, setDoc, addDoc, getDoc, getDocs, collection, onSnapshot, query, orderBy, startAt, endAt, limit } from "firebase/firestore";
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

export const addDataToCollection = async (items, collectionRef) => {

  try {
    const q = doc(db, `${collectionRef}`, `${items.name}`)
    if(await isExist(q)){
      toast.error("Data Is Already In the Store");
      return
    }
    await setDoc( q , { ...items });
    toast.success(`${collectionRef} Created Succesfully!`)
  } catch (e) {
    toast.error("Server Connection Faild ");
  }
}

const isExist = async (q) =>{
  const docSnap = await getDoc(q)
  console.log()
  if(docSnap.data() == undefined){
    return false
  }
  return true
}



export const delteColloctionInstance = async (itemsID, collectionRef) => {
  try {
    await deleteDoc(doc(db, `${collectionRef}`, `${itemsID}`));
    toast.success(`${collectionRef} Item deleted Succesfully!`)
  } catch (e) {
    toast.error("Server Connection Faild ");
  }
  
}
