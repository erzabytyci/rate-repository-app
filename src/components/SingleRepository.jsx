import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { useParams } from 'react-router-native';

import useRepository from '../hooks/useRepository';
import RepositoryItem from './RepositoryItem';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const SingleRepository = () => {
  const { id } = useParams(); 
  const { repository, loading, error } = useRepository(id);

  if (loading) {
    return (
      <View style={[styles.container, styles.centered]}>
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Error loading repository</Text>
      </View>
    );
  }

  if (!repository) {
    return (
      <View style={[styles.container, styles.centered]}>
        <Text>Repository not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RepositoryItem repository={repository} showGitHubButton />
    </View>
  );
};

export default SingleRepository;
