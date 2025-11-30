import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#24292e',
    flexDirection: 'row',
  },
  tab: {
    marginRight: 15,
  },
  tabText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.tab} onPress={() => {}}>
        <Text style={styles.tabText}>Repositories</Text>
      </Pressable>
    </View>
  );
};

export default AppBar;
