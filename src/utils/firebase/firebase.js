import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAbbIxq4zDBbGsrzoJkePbQql9476DybBI',
  authDomain: 'crwn-clothing-db-21323.firebaseapp.com',
  projectId: 'crwn-clothing-db-21323',
  storageBucket: 'crwn-clothing-db-21323.appspot.com',
  messagingSenderId: '184025796980',
  appId: '1:184025796980:web:697d28efbb8688adda1c21',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Authentication Service
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

// Sign In with Popup
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

// Sign In with Redirect
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

// Firestore Database Service
const db = getFirestore();

export const createUserDocFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('Error creating the use', error.message);
    }
  }

  return userDocRef;
};

// Create users with email and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// Sign in user with email and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

// Sign out users
export const signOutUser = async () => await signOut(auth);

// Observable listener
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
