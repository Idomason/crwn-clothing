import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Firestore Database Service
const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error) {
      console.log('Error creating the use', error.message);
    }
  }

  return userDocRef;
};
