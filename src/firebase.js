import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBl0CT5Wp8QhsmlrSkG9pAb6W4O3Phmjv8",
    authDomain: "messenger-app-firebase-348a3.firebaseapp.com",
    projectId: "messenger-app-firebase-348a3",
    storageBucket: "messenger-app-firebase-348a3.appspot.com",
    messagingSenderId: "828352473634",
    appId: "1:828352473634:web:ba83fa19194648aa06787b"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
