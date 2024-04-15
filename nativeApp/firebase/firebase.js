import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAndHvbIDzkI7sUYyIiWI_M8_q3ZmNqPI",
  authDomain: "nativeapp-97520.firebaseapp.com",
  projectId: "nativeapp-97520",
  storageBucket: "nativeapp-97520.appspot.com",
  messagingSenderId: "594286615060",
  appId: "1:594286615060:web:7999563cba3c1ef1632501"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { auth, db };
