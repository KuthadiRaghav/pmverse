import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If Firebase wasn't initialized correctly (e.g. missing placeholder keys)
    if (!auth) {
      console.warn("Firebase Auth is not initialized. Using a mock auth state.");
      // We set a mock user if they have the 'pmverse_onboarded' flag, just to not break the UI completely
      // before they enter real credentials.
      if (localStorage.getItem('pmverse_onboarded')) {
        setCurrentUser({ uid: 'mock-uid', email: 'guest@pmverse.os' });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser // Exposed for the mock state, usually handled entirely by onAuthStateChanged
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
