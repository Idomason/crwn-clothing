import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user-context';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase';
import FormInput from '../form-input/form-input';
import './sign-in-form.scss';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button';

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { email, password } = formFields;

  const { setCurrentUser } = useContext(UserContext);

  // Sign in with google firebase method
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    setCurrentUser(user);
    await createUserDocFromAuth(user);
  };

  // Reset form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Form submit event handler function
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      setCurrentUser(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case 'auth/wrong-password':
          alert('Sorry, incorrect password');
          resetFormFields();
          break;
        case 'auth/user-not-found':
          alert('No user associated with this email');
          resetFormFields();
          break;
        default:
          console.log(error);
          resetFormFields();
      }
    }
  };

  // Input onchange handler function
  const onChangeHandle = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <>
      <div className='sign-up-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={onSubmitHandler}>
          <>
            <FormInput
              label='Email'
              type='email'
              name='email'
              value={email}
              onChange={onChangeHandle}
              required
            />
          </>
          <>
            <FormInput
              label='Password'
              type='password'
              name='password'
              value={password}
              onChange={onChangeHandle}
              required
            />
          </>

          <div className='buttons-container'>
            <Button type='submit'>Sign In</Button>
            <Button
              type='button'
              buttonType={BUTTON_TYPE_CLASSES.google}
              onClick={signInWithGoogle}
            >
              Google Sign In
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignInForm;
