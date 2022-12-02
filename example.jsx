import React,{useRef,useState} from  'react';
import {FirebaseRecaptchaVerificationModel} from 'expo-firebase-recaptcha'
import {firebaseConfig} from '../config'
import firebase from 'firebase/compact/app'

const Otp = ()=>{
    const [phoneNumber,setPhoneNumber]=useState('')
    const [code,setCode]=useState('')
    const [verificationId,setVerificationId]=useState(null)
    const recaptchaVerification = useRef(null);

    const sendVerfication =()=>{
        const phoneProvider = new firebase.auth.phoneAuthProvider()
            phoneProvider.verifyPhoneNumber(phoneNumber,recaptchaVerification.current)
            .then(verificationId)
            setPhoneNumber('')
    }

    const confirmCode = ()=>{
        const credential = firebase.auth.phoneNumber.credential(verificationId,code)

        firebase.auth().singnInWithCredential(credential)
        .then(()=>{
            console.log('success')
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}
