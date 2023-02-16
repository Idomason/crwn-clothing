import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';
import SignUpForm from '../../components/sign-up-form/sign-up-form';

import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase';

const SignIn = () => {
  // Used for Redirect only
  // =================
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

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  };

  return (
    <>
      <div>Sign In Page</div>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}
      <SignUpForm />
    </>
  );
};

export default SignIn;
