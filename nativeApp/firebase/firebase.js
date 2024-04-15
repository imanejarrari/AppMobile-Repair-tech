import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import firebase from 'firebase/compat/app';

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

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };