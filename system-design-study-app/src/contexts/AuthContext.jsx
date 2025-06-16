import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Assumes auth is exported from firebaseConfig.js

/**
 * @typedef {object} User - Firebase user object or a simplified version.
 * @property {string} uid - User's unique ID.
 * @property {string|null} email - User's email.
 */

/**
 * @typedef {object} AuthContextType
 * @property {User|null} currentUser - The currently authenticated user, or null if not authenticated.
 * @property {boolean} loading - True while checking auth state, false otherwise.
 * @property {Function} signup - Function to sign up a new user.
 * @property {Function} login - Function to log in an existing user.
 * @property {Function} logout - Function to log out the current user.
 */

/**
 * @type {React.Context<AuthContextType|undefined>}
 */
const AuthContext = createContext(undefined);

/**
 * Custom hook to use the AuthContext.
 * @returns {AuthContextType} The authentication context.
 * @throws {Error} If used outside of an AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

/**
 * Provides authentication context to its children components.
 * Manages user authentication state and provides auth functions.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to be wrapped by the provider.
 */
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        if (user) {
          // User is signed in. Store a simplified user object or the full Firebase user object.
          setCurrentUser({
            uid: user.uid,
            email: user.email,
            // Add other relevant user properties if needed
          });
        } else {
          // User is signed out.
          setCurrentUser(null);
        }
        setLoading(false);
      },
      (error) => {
        // Handle errors during auth state observation if necessary
        console.error("Auth state change error:", error);
        setCurrentUser(null);
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  /**
   * Signs up a new user with email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<UserCredential>} Firebase UserCredential object.
   */
  async function signup(email, password) {
    // Consider adding password strength requirements or other validations here or in the UI
    return createUserWithEmailAndPassword(auth, email, password);
  }

  /**
   * Logs in an existing user with email and password.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {Promise<UserCredential>} Firebase UserCredential object.
   */
  async function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  /**
   * Logs out the current user.
   * @returns {Promise<void>}
   */
  async function logout() {
    return signOut(auth);
  }

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
  };

  // Render children only when not loading to prevent rendering protected routes prematurely
  // Or, allow children to render and handle loading state themselves if preferred
  return (
    <AuthContext.Provider value={value}>
      {/* {!loading && children}  // Option 1: Delay rendering children until auth state is resolved
                               // Option 2 (current): Render children immediately, components handle loading state.
                               // This is often preferred for better UX (e.g. show skeleton loaders)
      */}
      {children}
    </AuthContext.Provider>
  );
}
