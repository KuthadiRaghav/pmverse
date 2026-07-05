import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyDk2XhU5rujNnYwj0GVkaijBNp6J4JfPxw",
  authDomain: "pmversestudio.firebaseapp.com",
  projectId: "pmversestudio",
  storageBucket: "pmversestudio.firebasestorage.app",
  messagingSenderId: "783139057211",
  appId: "1:783139057211:web:603f9bbed55c15e895361e",
  measurementId: "G-39P3RB7NRB"
};

// Initialize Firebase
let app;
let auth;
let db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  
  // Analytics is only initialized if we are in a browser environment
  if (typeof window !== 'undefined') {
    getAnalytics(app);
  }
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { auth, db };
