import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBeS12ZikuZiYoaxTvIrEfZ-m7NJVPCvEw',
  authDomain: 'crwn-clothing-db-82741.firebaseapp.com',
  projectId: 'crwn-clothing-db-82741',
  storageBucket: 'crwn-clothing-db-82741.appspot.com',
  messagingSenderId: '952253716740',
  appId: '1:952253716740:web:e809a80703cdaece7f1851',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  param: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopUp = () =>
  signInWithPopup(auth, googleProvider);

export const db = getFirestore();

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
      console.log('Error while creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createUserAuthUserWithEmailAndPassword = async (
  email,
  password
) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};
