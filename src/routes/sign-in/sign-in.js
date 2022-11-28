import SignUpForm from '../../components/sign-up-form/sign-up-form';
import {
  signInWithGooglePopUp,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase';

const Authentication = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocFromAuth(user);
  };

  return (
    <div>
      <h2>Sign In</h2>
      <button onClick={logGoogleUser}>Sign In with Google</button>
      <SignUpForm />
    </div>
  );
};

export default Authentication;
