import React from 'react';
import { View, StyleSheet, TextInput, Pressable } from 'react-native';
import { Formik } from 'formik';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: theme.colors.primary, 
    borderRadius: 4,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleChange, handleSubmit, values }) => (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={values.username}
            onChangeText={handleChange('username')}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
          />

          <Pressable onPress={handleSubmit} style={styles.button}>
            <Text fontWeight="bold" style={styles.buttonText}>
              Sign in
            </Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return <SignInForm onSubmit={onSubmit} />;
};

export default SignIn;
