// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// IMPORTANT: User must replace this with their actual Firebase configuration.
const firebaseConfig = {
  apiKey: "YOUR_API_KEY", // Replace
  authDomain: "YOUR_AUTH_DOMAIN", // Replace
  projectId: "YOUR_PROJECT_ID", // Replace
  storageBucket: "YOUR_STORAGE_BUCKET", // Replace
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID", // Replace
  appId: "YOUR_APP_ID" // Replace
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
