import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useQuery } from '@apollo/client';
import { format } from 'date-fns';

import { ME } from '../graphql/queries';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  separator: {
    height: 10,
  },
  reviewItemContainer: {
    backgroundColor: 'white',
    padding: 15,
    flexDirection: 'row',
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
  repoName: {
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.reviewItemContainer}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View style={styles.reviewContent}>
        <Text style={styles.repoName}>{review.repository.fullName}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const { data, loading, error } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error loading reviews</Text>
      </View>
    );
  }

  const reviews = data?.me?.reviews
    ? data.me.reviews.edges.map((edge) => edge.node)
    : [];

  if (reviews.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No reviews yet</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
