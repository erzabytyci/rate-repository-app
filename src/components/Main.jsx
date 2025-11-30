import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';      
import RepositoryList from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,   
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <RepositoryList />
    </View>
  );
};

export default Main;
