// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdTWqOWBIFtK9kesXTY6-ipBiy6Pw-f3k",
  authDomain: "bmi-calculator-bd7f3.firebaseapp.com",
  projectId: "bmi-calculator-bd7f3",
  storageBucket: "bmi-calculator-bd7f3.firebasestorage.app",
  messagingSenderId: "624234841074",
  appId: "1:624234841074:web:08f02f11c324600b6be16b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };