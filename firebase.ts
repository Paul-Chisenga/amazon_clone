// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALunAeHc-ByX1F0zkKy-B2bAEhoA74Ago",
  authDomain: "clone-d39c7.firebaseapp.com",
  projectId: "clone-d39c7",
  storageBucket: "clone-d39c7.appspot.com",
  messagingSenderId: "1013530642953",
  appId: "1:1013530642953:web:65e06563db4284e8c906d8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
