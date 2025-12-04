import React, { useState } from 'react';
import { FlatList, View, StyleSheet, Pressable, TextInput } from 'react-native';
import { useNavigate } from 'react-router-native';
import { Picker } from '@react-native-picker/picker';
import { useDebounce } from 'use-debounce';

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
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryListHeader = ({ selectedOrder,
   setSelectedOrder,
   searchKeyword,
   setSearchKeyword, }) => {
  return (
    <View style={styles.header}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchKeyword}
        onChangeText={setSearchKeyword}
      />
      
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

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {
      selectedOrder,
      setSelectedOrder,
      searchKeyword,
      setSearchKeyword,
    } = this.props;

    return (
      <RepositoryListHeader
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
    );
  };

  render() {
    const { repositories, onRepositoryPress } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <Pressable onPress={() => onRepositoryPress(item.id)}>
            <RepositoryItem repository={item} />
          </Pressable>
        )}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}


const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);

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
    searchKeyword: debouncedSearchKeyword || undefined,
  });

  const navigate = useNavigate();

  const onRepositoryPress = (id) => {
    navigate(`/repository/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onRepositoryPress={onRepositoryPress}
    />
  );
};

export default RepositoryList;