import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";




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

// Get the Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };