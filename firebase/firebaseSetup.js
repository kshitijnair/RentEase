// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCLBKb9WpnTBGQQo2RWnZeVyVa_JRVMBXk",
  authDomain: "rentease-1cea1.firebaseapp.com",
  projectId: "rentease-1cea1",
  storageBucket: "rentease-1cea1.appspot.com",
  messagingSenderId: "608723545224",
  appId: "1:608723545224:web:11fcb865f642506b54c33d",
  measurementId: "G-KSNJ97MJ00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);