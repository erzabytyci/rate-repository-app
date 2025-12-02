import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';

import Main from './src/components/Main';
import createApolloClient from './src/utils/apolloClient';
import AuthStorage from './src/utils/authStorage';
import AuthStorageContext from './src/contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);


export default function App() {
  return (
    <AuthStorageContext.Provider value={authStorage}>
      <ApolloProvider client={apolloClient}>
        <NativeRouter>
          <Main />
          <StatusBar style="auto" />
        </NativeRouter>
      </ApolloProvider>
    </AuthStorageContext.Provider>
  );
}
