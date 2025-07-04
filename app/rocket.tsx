// ModalScreen.tsx
import { Text } from '@/components/Themed'; // same path as before
import { StatusBar } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Platform,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

type Photo = {
  id: string;
  urls: { regular: string };
  alt_description: string;
  user: { name: string };
};

export default function ModalScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const theme = useColorScheme();
  const isDark = theme === 'dark';

  const fetchPhotos = async () => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/photos/random?count=10&client_id=yCUX2-HVqgcx-bXggadJO1pWdGS0837dKu13iXc48EE`
      );
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      console.error('Error fetching photos', err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchPhotos();
    setRefreshing(false);
  }, []);

  const renderCard = ({ item }: { item: Photo }) => (
    <TouchableOpacity style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      <Image source={{ uri: item.urls.regular }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, isDark && styles.titleDark]}>
          {item.alt_description || 'Untitled'}
        </Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>
          by {item.user.name}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id}
        renderItem={renderCard}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#E0AFFF" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5E9FF' },
  containerDark: { backgroundColor: '#2E003E' },
  list: { padding: 16 },
  card: {
    borderRadius: 12,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
  },
  cardLight: { backgroundColor: '#FFFFFF' },
  cardDark: { backgroundColor: '#3A003A' },
  image: { width: '100%', height: 200 },
  textContainer: { padding: 12 },
  title: { fontSize: 20, fontWeight: '700', color: '#4E007E', marginBottom: 4 },
  titleDark: { color: '#E0AFFF' },
  subtitle: { fontSize: 14, color: '#6D0080' },
  subtitleDark: { color: '#B992FF' },
});

// Optional — if you're using Expo Router or pre-rendering
export const dynamic = 'force-static';

// Update metadata for the new screen
export const metadata = {
  title: 'Unsplash Gallery',
};
