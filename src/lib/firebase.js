// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain:  process.env.authDomain,
  projectId: "enigma-6e073",
  storageBucket: "enigma-6e073.firebasestorage.app",
  messagingSenderId: "674867006811",
  appId: "1:674867006811:web:c04554014cc1e0da6cde7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db, collection, addDoc }; 