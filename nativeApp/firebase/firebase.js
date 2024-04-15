import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import 'firebase/compat/storage'
import firebase from 'firebase/compat/app'
import { getReactNativePersistence } from 'firebase/auth'; 
import { collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBAndHvbIDzkI7sUYyIiWI_M8_q3ZmNqPI",
  authDomain: "nativeapp-97520.firebaseapp.com",
  projectId: "nativeapp-97520",
  storageBucket: "nativeapp-97520.appspot.com",
  messagingSenderId: "594286615060",
  appId: "1:594286615060:web:7999563cba3c1ef1632501"
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export {auth,db,firebase}