import React from 'react';
import { View, StyleSheet, ScrollView} from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: theme.colors.appBarBackground,
    flexDirection: 'row',
     },
  scroll: {
    flexDirection: 'row',
  },
  tab: {
    marginRight: 20,
  },
});

const AppBarTab = ({ to, children }) => {
  return (
    <Link to={to} style={styles.tab}>
      <Text
        style={{ color: 'white' }}
        fontWeight="bold"
        fontSize="subheading"
      >
        {children}
      </Text>
    </Link>
  );
};

const AppBar = () => {
  return (
    <View style={styles.container}>
        <ScrollView horizontal style={styles.scroll} showsHorizontalScrollIndicator={false}>
           <AppBarTab to="/">Repositories</AppBarTab>
           <AppBarTab to="/signin">Sign in</AppBarTab>
           </ScrollView>
    </View>
  );
};

export default AppBar;