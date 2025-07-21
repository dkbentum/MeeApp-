import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, useColorScheme } from 'react-native';

// Mock data for user's posts
const mockPosts = [
  {
    id: 1,
    title: 'React Native Tips',
    imageUrl: 'https://picsum.photos/id/1011/400/250',
  },
  {
    id: 2,
    title: 'Expo Tricks',
    imageUrl: 'https://picsum.photos/id/1012/400/250',
  },
  {
    id: 3,
    title: 'Networking Event',
    imageUrl: 'https://picsum.photos/id/1013/400/250',
  },
  {
    id: 4,
    title: 'UI Showcase',
    imageUrl: 'https://picsum.photos/id/1014/400/250',
  },
];

export default function YourWKPosts() {
  const isDark = useColorScheme() === 'dark';
  const styles = getStyles(isDark);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>Your WK-Posts</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        {mockPosts.map(post => (
          <View key={post.id} style={styles.card}>
            <Image source={{ uri: post.imageUrl }} style={styles.image} />
            <View style={styles.overlay}>
              <Text style={styles.title}>{post.title}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  wrapper: {
    marginBottom: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDark ? '#E0D4FF' : '#6D0080',
    marginBottom: 10,
    marginLeft: 4,
  },
  scroll: {
    paddingLeft: 2,
  },
  card: {
    width: 160,
    height: 100,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 14,
    backgroundColor: isDark ? '#23203a' : '#f3eafd',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
}); 