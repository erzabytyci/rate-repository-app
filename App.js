import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ApolloProvider } from '@apollo/client/react';

import Main from './src/components/Main';

import createApolloClient from './src/utils/apolloClient';

const client = createApolloClient();


export default function App() {
  return (
    <>
    <ApolloProvider client={client}>
      <NativeRouter>
        <Main />
          <StatusBar style="auto" />
      </NativeRouter>
     </ApolloProvider>
    </>
  );
}
