import { initializeApp } from 'firebase/app'
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
    apiKey: "AIzaSyC792GylNpvacFDj89j9W97jBYpq7fNNQE",
    authDomain: "eatpizza-cdcd6.firebaseapp.com",
    projectId: "eatpizza-cdcd6",
    storageBucket: "eatpizza-cdcd6.appspot.com",
    messagingSenderId: "388307025925",
    appId: "1:388307025925:web:411d81b036bf74c64f9c6c",
    measurementId: "G-46XPGHH7P6"
  };
  
  // Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp);
