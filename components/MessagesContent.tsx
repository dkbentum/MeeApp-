import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, useColorScheme } from 'react-native';
import { Text, View } from './Themed';

export default function MessagesContentInfo({ path }: { path: string }) {
  type Post = { id: number; title: string; body: string };
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const fetchData = async (limit = 40) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
      const data = await response.json();
      setPostList(data);
    } catch (error) {
      console.error('Failed to fetch messages', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderMessage = ({ item }: { item: Post }) => (
    <View style={styles.messageBubble}>
      <Text style={styles.messageTitle}>{item.title}</Text>
      <Text style={styles.messageBody}>{item.body}</Text>
      <Text style={styles.messageTimestamp}>Received just now ⏳</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={isDark ? '#BB86FC' : '#6A0DAD'} />
      ) : (
        <FlatList
          data={postList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMessage}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#F7F2FF',
      paddingHorizontal: 16,
    },
    listContent: {
      paddingBottom: 30,
    },
    messageBubble: {
      backgroundColor: isDark ? '#1E293B' : '#E1ECF7',
      padding: 16,
      borderRadius: 16,
      marginBottom: 14,
      elevation: 2,
      shadowColor: isDark ? '#000' : '#888',
      shadowOpacity: 0.07,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
    },
    messageTitle: {
      fontSize: 17,
      fontWeight: '600',
      color: isDark ? '#E0E0FF' : '#1E293B',
      marginBottom: 6,
    },
    messageBody: {
      fontSize: 15,
      color: isDark ? '#CBD5E1' : '#334155',
      marginBottom: 10,
    },
    messageTimestamp: {
      fontSize: 12,
      color: isDark ? '#94A3B8' : '#64748B',
      textAlign: 'right',
    },
  });
