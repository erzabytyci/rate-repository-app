import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
   header: {
    padding: 10,
    backgroundColor: 'white',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ selectedOrder, setSelectedOrder }) => {
  return (
    <View style={styles.header}>
      <Picker
        selectedValue={selectedOrder}
        onValueChange={(value) => setSelectedOrder(value)}
      >
        <Picker.Item
          label="Latest repositories"
          value="latest"
        />
        <Picker.Item
          label="Highest rated repositories"
          value="highest"
        />
        <Picker.Item
          label="Lowest rated repositories"
          value="lowest"
        />
      </Picker>
    </View>
  );
};

export const RepositoryListContainer = ({
  repositories,
  selectedOrder,
  setSelectedOrder,
}) => {
  const navigate = useNavigate();


  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  const onPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => ( 
      <Pressable onPress={() => onPress(item.id)}>
          <RepositoryItem repository={item} />
      </Pressable>
      )}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <RepositoryListHeader
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        />
      )}
    />
  );
};

const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');

  let orderBy = 'CREATED_AT';
  let orderDirection = 'DESC';

  if (selectedOrder === 'highest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'DESC';
  } else if (selectedOrder === 'lowest') {
    orderBy = 'RATING_AVERAGE';
    orderDirection = 'ASC';
  }

  const { repositories } = useRepositories({
    orderBy,
    orderDirection,
  });

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
    />
  );
};

export default RepositoryList;