import React from 'react';
import { View, StyleSheet, Image, Text, Pressable, Linking} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: 'white',
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 4,
    marginRight: 15,
  },
  info: {
    flexShrink: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    marginBottom: 8,
    color: '#586069',
  },
  languageTag: {
    alignSelf: 'flex-start',
    backgroundColor: '#0366d6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  languageText: {
    color: 'white',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const formatCount = (value) => {
  if (value < 1000) return String(value);
  return (value / 1000).toFixed(1) + 'k';
};

const Stat = ({ label, value }) => (
  <View style={styles.statItem}>
    <Text style={styles.statValue}>{formatCount(value)}</Text>
    <Text>{label}</Text>
  </View>
);

const RepositoryItem = ({ repository, showGitHubButton = false }) => {
   if (!repository) {
    return null;
  }

  const handleOpenGitHub = () => {
    if (repository.url) {
      Linking.openURL(repository.url);
    }
  };
  
  return (
    <View testID="repositoryItem" style={styles.container}>
      <View style={styles.topRow}>
        <Image
          style={styles.avatar}
          source={{ uri: repository.ownerAvatarUrl }}
        />
        <View style={styles.info}>
          <Text style={styles.name}>{repository.fullName}</Text>
          <Text style={styles.description}>{repository.description}</Text>
          <View style={styles.languageTag}>
            <Text style={styles.languageText}>{repository.language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat label="Stars" value={repository.stargazersCount} />
        <Stat label="Forks" value={repository.forksCount} />
        <Stat label="Reviews" value={repository.reviewCount} />
        <Stat label="Rating" value={repository.ratingAverage} />
      </View>

       {showGitHubButton && (
        <Pressable style={styles.githubButton} onPress={handleOpenGitHub}>
          <Text style={styles.githubButtonText}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};

export default RepositoryItem;
