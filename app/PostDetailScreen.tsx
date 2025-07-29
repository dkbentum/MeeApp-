import React from 'react';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import PostDetails, { Post } from '@/components/PostDetails';
import { useColorScheme } from '@/components/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

export default function PostDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const isDark = useColorScheme() === 'dark';

  // Parse post from params (assume all fields are passed as strings)
  const post: Post = {
    id: Number(params.id),
    title: params.title as string,
    body: params.body as string,
    imageUrl: params.imageUrl as string | undefined,
    category: params.category as string | undefined,
    date: params.date as string | undefined,
    userId: params.userId ? Number(params.userId) : undefined,
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1A1333' : '#F6F0FF' }]}>  
      <PostDetails
        visible={true}
        post={post}
        onClose={() => {}}
        relatedPosts={[]}
        isDark={isDark}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 32 : 0,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    zIndex: 10,
  },
  backText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },
}); 