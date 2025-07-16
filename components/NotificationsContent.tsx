import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator, useColorScheme } from 'react-native';
import { Text } from './Themed'; // Assuming this already adapts to theme

export default function NotificationsContentInfo({ path }: { path: string }) {
  type Post = { id: number; title: string; body: string };
  const [postList, setPostList] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const fetchData = async (limit = 60) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
      const data = await response.json();
      setPostList(data);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderNotification = ({ item }: { item: Post }) => (
    <View style={styles.notificationCard}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationBody} numberOfLines={2}>
        {item.body}
      </Text>
      <Text style={styles.timestamp}>Just now ⏱️</Text>
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
          renderItem={renderNotification}
          contentContainerStyle={styles.list}
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
      paddingHorizontal: 20,
    },
    list: {
      paddingBottom: 30,
    },
    notificationCard: {
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      padding: 16,
      borderRadius: 16,
      marginBottom: 14,
      shadowColor: isDark ? '#000' : '#aaa',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 6,
      elevation: 2,
    },
    notificationTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#BB86FC' : '#4B0082',
      marginBottom: 4,
    },
    notificationBody: {
      fontSize: 15,
      color: isDark ? '#CCCCCC' : '#444',
      marginBottom: 10,
    },
    timestamp: {
      fontSize: 13,
      color: isDark ? '#AAAAAA' : '#888',
      textAlign: 'right',
    },
  });
