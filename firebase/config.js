import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export const firebaseConfig = {
  apiKey: "AIzaSyD5M09yKewU3ebnQhJpr4-TQ-EUaFXjeS4",
  authDomain: "testnodenative.firebaseapp.com",
  databaseURL:
    "https://testnodenative-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "testnodenative",
  storageBucket: "testnodenative.appspot.com",
  messagingSenderId: "889406239424",
  appId: "1:889406239424:web:1bc4923918cbbe994df325",
  measurementId: "G-WC4FMSMZQJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
// OjIA0MSxmJL2TRI3dODGuZAOhXjjZ8hkRAWqhpvR;
