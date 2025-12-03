import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SignInForm from '../../components/SignInForm'; 

describe('SignIn', () => {
  describe('SignInForm', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      const { getByPlaceholderText, getByText } = render(
        <SignInForm onSubmit={onSubmit} />
      );

      fireEvent.changeText(getByPlaceholderText('Username'), 'kalle');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password123');

      fireEvent.press(getByText('Sign in'));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);

        const firstArg = onSubmit.mock.calls[0][0];

        expect(firstArg).toEqual({
          username: 'kalle',
          password: 'password123',
        });
      });
    });
  });
});
