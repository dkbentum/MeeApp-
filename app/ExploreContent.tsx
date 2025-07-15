import { Feather, FontAwesome } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

type Post = {
  id: number;
  title: string;
  body: string;
};

const { height: screenHeight } = Dimensions.get('window');
const cardHeight = screenHeight * 0.61; // make card slightly smaller than screen

const ExploreContentInfo = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const fetchPosts = async () => {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=10');
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const renderItem = ({ item }: { item: Post }) => (
    <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#f4f4f4' }]}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `https://picsum.photos/id/${item.id}/600/400` }}
          style={styles.image}
        />
        <View style={styles.iconOverlay}>
          <TouchableOpacity>
            <Feather name="bookmark" size={22} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 16 }}>
            <FontAwesome name="headphones" size={22} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text
          style={[styles.title, { color: isDark ? '#fff' : '#111' }]}
          numberOfLines={2}
        >
          {item.title}
        </Text>
        <Text
          style={[styles.subtitle, { color: isDark ? '#ccc' : '#333' }]}
          numberOfLines={2}
        >
          {item.body}
        </Text>

        <View style={styles.authorRow}>
          <Image
            source={{ uri: `https://i.pravatar.cc/40?u=${item.id}` }}
            style={styles.avatar}
          />
          <Text style={[styles.authorText, { color: isDark ? '#aaa' : '#666' }]}>
            @dailyed
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6D0080" />
        <Text style={{ marginTop: 8 }}>Loading posts...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
      snapToInterval={cardHeight + 20} // card height + margin
      snapToAlignment="start"
      decelerationRate="fast"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingVertical: 10,
      }}
      getItemLayout={(_, index) => ({
        length: cardHeight + 20,
        offset: (cardHeight + 20) * index,
        index,
      })}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    height: cardHeight,
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  iconOverlay: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  textContainer: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 12,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto',
  },
  avatar: {
    width: 26,
    height: 26,
    borderRadius: 13,
    marginRight: 8,
  },
  authorText: {
    fontSize: 13,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExploreContentInfo;
