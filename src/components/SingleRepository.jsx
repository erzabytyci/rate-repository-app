import React from 'react';
import { View, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import { useParams } from 'react-router-native';
import { format } from 'date-fns';

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
  separator: {
    height: 10,
  },
  reviewItemContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 15,
  },
  ratingContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, 
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewContent: {
    flex: 1,
  },
  username: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    color: '#586069',
    marginBottom: 8,
  },
  reviewText: {
    color: '#000000',
  },
});

function RepositoryInfo({ repository }) {
  return <RepositoryItem repository={repository} showGitHubButton />;
}

function ReviewItem({ review }) {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View style={styles.reviewContent}>
        <Text style={styles.username}>{review.user.username}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const SingleRepository = () => {
  const { id } = useParams(); 
  const first = 2;

  const { repository, loading, error, fetchMore } = useRepository(id, first);

  const onEndReach = () => {
    if (fetchMore) {
      fetchMore();
    }
  };

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

   const reviewNodes = repository.reviews
    ? repository.reviews.edges.map(edge => edge.node)
    : [];

   return (
    <FlatList
      style={styles.container}
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
      onEndReached={onEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
