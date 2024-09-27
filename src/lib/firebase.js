// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDDS1hwqCm6U81ww3erOK6hkhnY285_RYY",
  authDomain: "musix-35204.firebaseapp.com",
  projectId: "musix-35204",
  storageBucket: "musix-35204.appspot.com",
  messagingSenderId: "188331848952",
  appId: "1:188331848952:web:de3369ba76c3b92ecbf70d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup, signOut };