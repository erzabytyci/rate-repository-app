import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Routes, Route, Navigate } from 'react-router-native';

import AppBar from './AppBar';  
import RepositoryList from './RepositoryList';
import SignIn from './SignIn';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground, 
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
       <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;
