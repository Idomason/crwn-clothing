import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  param: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('Error while creating the user', error.message);
    }
  }

  return userDocRef;
};
