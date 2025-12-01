import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from '@apollo/client';

import Main from './src/components/Main';

const client = new ApolloClient({
  uri: 'http://10.0.2.2:4000/graphql',
  cache: new InMemoryCache(),
});

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
