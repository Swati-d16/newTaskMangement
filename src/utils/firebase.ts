// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBrGqfzVPP7CXzQgWH13djzG6Ra7fcTJ0k",
  authDomain: "taskmangement-fe7e6.firebaseapp.com",
  projectId: "taskmangement-fe7e6",
  storageBucket: "taskmangement-fe7e6.firebasestorage.app",
  messagingSenderId: "459686651787",
  appId: "1:459686651787:web:15d87212a14aacb44bb18e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
