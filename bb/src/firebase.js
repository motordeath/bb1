// src/firebase.js
import { initializeApp } from "firebase/app";
import {
    getAuth,
    GoogleAuthProvider,
    GithubAuthProvider,
    setPersistence,
    browserLocalPersistence
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration provided by user
const firebaseConfig = {
    apiKey: "AIzaSyBYKXZf6CtoMWyfJ-RF3v_dxk7qXG0E8jc",
    authDomain: "bb-2005.firebaseapp.com",
    projectId: "bb-2005",
    storageBucket: "bb-2005.firebasestorage.app",
    messagingSenderId: "805268210086",
    appId: "1:805268210086:web:e5a2e3cb0be0ae9ab60f67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth
const auth = getAuth(app);

// Set persistence to local (survives refresh)
setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error("Firebase persistence error:", error);
});

// Configure Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

// Initialize Firestore
const db = getFirestore(app);

export { auth, googleProvider, githubProvider, db };
