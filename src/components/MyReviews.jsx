import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-native';

import { ME } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: 10,
  },
  reviewItemContainer: {
    backgroundColor: 'white',
    padding: 15,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  ratingContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#0366d6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  ratingText: {
    color: '#0366d6',
    fontWeight: 'bold',
    fontSize: 18,
  },
  info: {
    flex: 1,
  },
  repoName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 3,
  },
  date: {
    color: '#586069',
    marginBottom: 8,
  },
  reviewText: {
    marginBottom: 15,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    flex: 1,
  },
  viewButton: {
    backgroundColor: '#0366d6',
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#d73a4a',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review, navigate, confirmDelete }) => {
  const formattedDate = format(new Date(review.createdAt), 'dd.MM.yyyy');

  return (
    <View style={styles.reviewItemContainer}>
        <View style={styles.topRow}>
            <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
            </View>

      <View style={styles.info}>
        <Text style={styles.repoName}>{review.repository.fullName}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>

     <View style={styles.buttonsRow}>
        <Pressable
          style={[styles.button, styles.viewButton]}
          onPress={() => navigate(`/repository/${review.repository.id}`)}
        >
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.deleteButton]}
          onPress={() => confirmDelete(review.id)}
        >
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const navigate = useNavigate();

  const { data, loading, error, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  
  const [deleteReview] = useMutation(DELETE_REVIEW);

   const confirmDelete = (reviewId) => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteReview({ variables: { id: reviewId } });
              await refetch();
            } catch (e) {
              console.log('Delete error:', e);
            }
          },
        },
      ]
    );
  };

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
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          review={item}
          navigate={navigate}
          confirmDelete={confirmDelete}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviews;
