import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form';
import SignInForm from '../../components/sign-in-form/sign-in-form';
import './authentication.scss';

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase';

const Authentication = () => {
  // Authenticate with Redirect only
  // ===============================
  //
  // useEffect(() => {
  //   const redirectResult = async () => {
  //     const response = await getRedirectResult(auth);

  //     if (response) {
  //       const { user } = response;
  //       const userDocRef = createUserDocFromAuth(user);
  //     }
  //   };
  //   redirectResult();
  // }, []);

  return (
    <>
      <div className='authentication-container'>
        <SignInForm />
        <SignUpForm />
      </div>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
    </>
  );
};

export default Authentication;
