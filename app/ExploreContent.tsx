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
  Modal,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Add category and date to Post type
export type Post = {
  id: number;
  title: string;
  body: string;
  imageUrl?: string;
  category?: string;
  date?: string;
};

const { height: screenHeight } = Dimensions.get('window');
const cardHeight = screenHeight * 0.61; // make card slightly smaller than screen

const API_BASE_URL = 'http://10.132.209.205:8080';

const ExploreContentInfo = ({ selectedTimeTab, selectedCategory }: {
  selectedTimeTab: string;
  selectedCategory: string;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const [showModal, setShowModal] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '', category: '', imageUrl: '' });
  const [submitting, setSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  // Helper to map time tab to date string (for demo, just use today/tomorrow)
  const getDateForTab = (tab: string) => {
    const today = new Date();
    if (tab === 'Today') return today.toISOString().slice(0, 10);
    if (tab === 'Tomorrow') {
      const tmr = new Date(today);
      tmr.setDate(today.getDate() + 1);
      return tmr.toISOString().slice(0, 10);
    }
    // For 'Upcoming', 'Weekend', return empty to fetch all
    return '';
  };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/api/posts/filter?`;
      if (selectedCategory && selectedCategory !== 'All Events') {
        url += `category=${encodeURIComponent(selectedCategory)}&`;
      }
      const date = getDateForTab(selectedTimeTab);
      if (date) {
        url += `date=${date}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data);
    } catch (err) {
      console.error('Failed to fetch posts:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    setSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPost.title,
          body: newPost.body,
          category: newPost.category || selectedCategory,
          imageUrl: newPost.imageUrl,
          date: new Date().toISOString().slice(0, 10),
          authorId: 1 // For demo, use 1. Replace with real user id in production.
        })
      });
      setShowModal(false);
      setNewPost({ title: '', body: '', category: '', imageUrl: '' });
      fetchPosts();
    } catch (err) {
      alert('Failed to create post.');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets[0]) {
      setImageUploading(true);
      const localUri = result.assets[0].uri;
      const filename = localUri.split('/').pop();
      const formData = new FormData();
      formData.append('file', {
        uri: localUri,
        name: filename,
        type: 'image/jpeg',
      });
      try {
        const res = await fetch(`${API_BASE_URL}/api/posts/upload-image`, {
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          body: formData,
        });
        const data = await res.json();
        setNewPost({ ...newPost, imageUrl: data.url });
      } catch (err) {
        alert('Image upload failed.');
      } finally {
        setImageUploading(false);
      }
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTimeTab, selectedCategory]);

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
    <>
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
      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setShowModal(true)}
        activeOpacity={0.8}
      >
        <Feather name="plus" size={28} color="#fff" />
      </TouchableOpacity>
      {/* Create WK-Post Modal */}
      <Modal
        visible={showModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create WK-Post</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Title"
              value={newPost.title}
              onChangeText={t => setNewPost({ ...newPost, title: t })}
            />
            <TextInput
              style={[styles.modalInput, { height: 80 }]}
              placeholder="Body"
              value={newPost.body}
              onChangeText={t => setNewPost({ ...newPost, body: t })}
              multiline
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Category (optional)"
              value={newPost.category}
              onChangeText={t => setNewPost({ ...newPost, category: t })}
            />
            <TouchableOpacity style={styles.uploadBtn} onPress={handlePickImage} disabled={imageUploading}>
              <Text style={styles.uploadBtnText}>{imageUploading ? 'Uploading...' : (newPost.imageUrl ? 'Change Image' : 'Upload Image')}</Text>
            </TouchableOpacity>
            {newPost.imageUrl ? (
              <Image source={{ uri: newPost.imageUrl }} style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 10 }} />
            ) : null}
            <View style={styles.modalBtnRow}>
              <Button title="Cancel" color="#888" onPress={() => setShowModal(false)} />
              <Button title={submitting ? 'Posting...' : 'Post'} onPress={handleCreatePost} disabled={submitting} />
            </View>
          </View>
        </View>
      </Modal>
    </>
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
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6D0080',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalInput: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  modalBtnRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
  },
  uploadBtn: {
    width: '100%',
    height: 50,
    backgroundColor: '#6D0080',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  uploadBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ExploreContentInfo;
