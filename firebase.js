// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAPKsvtwu74q3hP5RK-8ccDDbpaYi9YqCE",
  authDomain: "uber-clone-next-c9931.firebaseapp.com",
  projectId: "uber-clone-next-c9931",
  storageBucket: "uber-clone-next-c9931.appspot.com",
  messagingSenderId: "939640078421",
  appId: "1:939640078421:web:7b65a36f7d81cca5ce14dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth();
const db = getFirestore(app);

export { app, provider, auth, db };
