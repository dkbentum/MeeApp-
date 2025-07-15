import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome, Feather } from '@expo/vector-icons';

const { height: screenHeight } = Dimensions.get('window');

function ExploreContentInfo() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `https://picsum.photos/id/${item.id}/600/400` }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.textContent}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.body} numberOfLines={2}>
          {item.body}
        </Text>
        <View style={styles.footerRow}>
          <View style={styles.avatarRow}>
            <Image
              source={{ uri: `https://i.pravatar.cc/40?u=${item.id}` }}
              style={styles.avatar}
            />
            <Text style={styles.username}>curioustheo</Text>
          </View>
          <View style={styles.iconRow}>
            <TouchableOpacity>
              <Feather name="bookmark" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 16 }}>
              <FontAwesome name="headphones" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6D0080" />
        <Text>Loading posts...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      pagingEnabled
      showsVerticalScrollIndicator={false}
      decelerationRate="fast"
      snapToAlignment="start"
      snapToInterval={screenHeight}
      getItemLayout={(_, index) => ({
        length: screenHeight,
        offset: screenHeight * index,
        index,
      })}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    height: screenHeight,
    padding: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#EFE6F5',
  },
  image: {
    width: '100%',
    height: 220,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  textContent: {
    width: '100%',
    backgroundColor: '#258aa3ff',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  body: {
    fontSize: 14,
    color: '#e3cfcf',
    marginBottom: 12,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  username: {
    fontSize: 13,
    color: '#fff',
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExploreContentInfo;
