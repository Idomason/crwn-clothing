import {
  signInWithGooglePopup,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase';

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  };
  return (
    <>
      <div>Sign In Page</div>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    </>
  );
};

export default SignIn;
