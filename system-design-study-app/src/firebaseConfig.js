// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// IMPORTANT: User must replace this with their actual Firebase configuration.
const firebaseConfig = {
  apiKey: "AIzaSyB0u158CV_r_DxdTxqIZ2YvfKs4WQTMll8",
  authDomain: "system-design-prep-guide.firebaseapp.com",
  databaseURL: "https://system-design-prep-guide-default-rtdb.firebaseio.com",
  projectId: "system-design-prep-guide",
  storageBucket: "system-design-prep-guide.firebasestorage.app",
  messagingSenderId: "891325508499",
  appId: "1:891325508499:web:6b0633441c4a0af0ee1666"
};


let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  console.log("Firebase initialized successfully.");
} catch (e) {
  console.error("Firebase initialization error:", e);
  console.warn("Please ensure you have provided your Firebase configuration in src/firebaseConfig.js. Some features may not work.");
  // Provide mock objects or null if Firebase fails to initialize
  // to allow the rest of the app to function without Firebase features if designed to do so.
  app = null;
  auth = {
    // Mock auth object
    onAuthStateChanged: () => () => {}, // Returns an empty unsubscribe function
    signInWithPopup: () => Promise.reject(new Error("Firebase not configured")),
    signOut: () => Promise.reject(new Error("Firebase not configured")),
    // Add other methods that your app might call on auth if it can run without Firebase
  };
  db = null; // Or mock Firestore if parts of the app can run without it
}

export { app, auth, db };
