import React from 'react';
import { useNavigate } from 'react-router-native';
import useSignIn from '../hooks/useSignIn';
import SignInForm from './SignInForm';

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });
      console.log('AUTH RESULT:', data);
      navigate('/');
    } catch (e) {
      console.log('SIGN IN ERROR:', e);
    }
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
