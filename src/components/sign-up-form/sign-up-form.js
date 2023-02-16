import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocFromAuth,
} from '../../utils/firebase/firebase';
import FormInput from '../form-input/form-input';
import './sign-up-form.scss';
import Button from '../button/button';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  // Reset form fields
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Form submit event handler function
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password != confirmPassword) {
      alert('Sorry, password do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocFromAuth(user, { displayName });
      resetFormFields();
      console.log(`The user ${displayName} was created successfully`);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('User creation encountered an error', error);
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
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={onSubmitHandler}>
          <>
            <FormInput
              label='Display Name'
              type='text'
              name='displayName'
              value={displayName}
              onChange={onChangeHandle}
              required
            />
          </>
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
          <>
            <FormInput
              label='Confirm Password'
              type='password'
              name='confirmPassword'
              value={confirmPassword}
              onChange={onChangeHandle}
              required
            />
          </>
          <Button type='submit'>Sign Up</Button>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
