import React from 'react';
import { View, StyleSheet, ScrollView, Pressable} from 'react-native';
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/client';

import Text from './Text';
import theme from '../theme';
import { ME } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';

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

const AppBarTab = ({ to, children, onPress }) => {

  if (to) {
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
}

 return (
    <Pressable onPress={onPress} style={styles.tab}>
      <Text
        style={{ color: 'white' }}
        fontWeight="bold"
        fontSize="subheading"
      >
        {children}
      </Text>
    </Pressable>
  );
};

const AppBar = () => {
  const { data } = useQuery(ME, {
    fetchPolicy: 'cache-and-network',
  });

  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate('/');
  };

  const isSignedIn = !!data?.me;

  return (
    <View style={styles.container}>
        <ScrollView horizontal style={styles.scroll} showsHorizontalScrollIndicator={false}>
           <AppBarTab to="/">Repositories</AppBarTab>
            {isSignedIn ? (
              <>
              <AppBarTab to="/create-review">Create a review</AppBarTab>
              <AppBarTab onPress={signOut}>Sign out</AppBarTab>
              </>
            ) : (
              <AppBarTab to="/signin">Sign in</AppBarTab>
            )}
           </ScrollView>
    </View>
  );
};

export default AppBar;