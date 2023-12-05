// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDyNRVf9cuLLsXs7pvJUuSb_mQrXncES4I",
  authDomain: "restaurant-app-75061.firebaseapp.com",
  projectId: "restaurant-app-75061",
  storageBucket: "restaurant-app-75061.appspot.com",
  messagingSenderId: "82088502353",
  appId: "1:82088502353:web:51c1a5f8dd0319ed0d0470",
  measurementId: "G-ZKVHWLT23N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth, firestore, storage };
