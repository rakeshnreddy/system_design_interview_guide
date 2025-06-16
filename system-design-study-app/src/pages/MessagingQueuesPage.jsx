import React, { useState, useEffect } from 'react';
import { getFirestore, collection, doc, getDoc, setDoc, updateDoc, arrayUnion, onSnapshot } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

// Import the Firebase config
import { db, auth } from '../firebaseConfig';

// Import extracted components
import SidebarMQ from '../components/messaging_queues/SidebarMQ';
import IntroModuleMQ from '../components/messaging_queues/IntroModuleMQ';
import DeepDiveModuleMQ from '../components/messaging_queues/DeepDiveModuleMQ';
import GuaranteesModuleMQ from '../components/messaging_queues/GuaranteesModuleMQ';
import ScalabilityModuleMQ from '../components/messaging_queues/ScalabilityModuleMQ';
import FrameworksModuleMQ from '../components/messaging_queues/FrameworksModuleMQ';
import ScenariosModuleMQ from '../components/messaging_queues/ScenariosModuleMQ';
import CheatSheetModuleMQ from '../components/messaging_queues/CheatSheetModuleMQ';
import PracticeModuleMQ from '../components/messaging_queues/PracticeModuleMQ';

const MessagingQueuesPage = () => {
  const [activeModule, setActiveModule] = useState('intro');
  const [user, setUser] = useState(null); // Placeholder for user state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth || !db) {
      console.warn("Firebase is not configured. Auth and Firestore features will be limited.");
      setLoading(false);
      // It's important that auth.onAuthStateChanged can be called even if auth is a mock.
      // The mock in firebaseConfig.js handles this.
      if (auth && typeof auth.onAuthStateChanged === 'function') {
        const unsubscribe = auth.onAuthStateChanged(currentUser => {
            setUser(currentUser);
            // setLoading(false); // setLoading(false) is already called above for the !auth || !db case
        });
        return () => unsubscribe();
      }
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        // Example: Initialize user document in Firestore
        const userDocRef = doc(db, 'users_mq_progress', currentUser.uid);
        getDoc(userDocRef).then(docSnap => {
          if (!docSnap.exists()) {
            setDoc(userDocRef, { userId: currentUser.uid, name: currentUser.displayName, email: currentUser.email, progress: {} });
          }
        }).catch(error => console.error("Error accessing user doc:", error));
        console.log("User logged in:", currentUser.displayName);
      } else {
        console.log("User logged out or not authenticated.");
      }
    });
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount and cleans up on unmount

  const handleLogin = async () => {
    if (!auth || typeof auth.signInWithPopup !== 'function') { // Check if auth or its methods are mocked
        alert("Firebase not configured. Login unavailable.");
        return;
    }
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Error during sign-in: " + error.message + (error.code === 'auth/cancelled-popup-request' ? '. Pop-up closed by user or blocked by browser.' : ''));
    }
  };

  const handleLogout = async () => {
    if (!auth || typeof auth.signOut !== 'function') { // Check if auth or its methods are mocked
        alert("Firebase not configured. Logout unavailable.");
        return;
    }
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error during sign-out:", error);
      alert("Error during sign-out: " + error.message);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen"><p className="text-xl">Loading Messaging Queues Guide...</p></div>;
  }

  const moduleComponents = {
    intro: <IntroModuleMQ />,
    deepdive: <DeepDiveModuleMQ />,
    guarantees: <GuaranteesModuleMQ />,
    scalability: <ScalabilityModuleMQ />,
    frameworks: <FrameworksModuleMQ />,
    scenarios: <ScenariosModuleMQ user={user} />,
    cheatsheet: <CheatSheetModuleMQ />,
    practice: <PracticeModuleMQ user={user} />,
  };

  return (
    <div className="flex h-screen font-sans">
      <SidebarMQ
        setActiveModule={setActiveModule}
        activeModule={activeModule}
        user={user}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto bg-neutral-50 dark:bg-neutral-900">
        {moduleComponents[activeModule] || <IntroModuleMQ /> }
      </main>
    </div>
  );
};

export default MessagingQueuesPage;
