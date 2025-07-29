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
  Pressable,
  ScrollView,
  FlatList as RNFlatList,
} from 'react-native';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import PostDetails, { Post as PostType } from '@/components/PostDetails';
import { useRouter } from 'expo-router';

// Add category and date to Post type
export type Post = {
  id: number;
  title: string;
  body: string;
  imageUrl?: string;
  category?: string;
  date?: string;
  userId?: number; // Added for host details
};

const { height: screenHeight } = Dimensions.get('window');
const cardHeight = screenHeight * 0.61; // make card slightly smaller than screen

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

const ExploreContentInfo = ({ selectedTimeTab, selectedCategory }: {
  selectedTimeTab: string;
  selectedCategory: string;
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const router = useRouter();
  const [newPost, setNewPost] = useState({ title: '', body: '', category: '', imageUrl: '' });
  const [submitting, setSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [activeBookmarks, setActiveBookmarks] = useState<{ [key: number]: boolean }>({});
  const [activeConnects, setActiveConnects] = useState<{ [key: number]: boolean }>({});
  const [showModal, setShowModal] = useState(false); // Added for Create WK-Post Modal

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

  // Fetch posts by interest or user if filters are set, otherwise fetch all
  const fetchPosts = async () => {
    setLoading(true);
    try {
      let url = `${API_BASE_URL}/posts`;
      // JSONPlaceholder does not support filtering by category or time, so fetch all and filter locally
      const res = await fetch(url);
      let data = await res.json();
      // Add dummy fields for imageUrl, category, date, userId
      data = data.slice(0, 20).map((item: any, idx: number) => ({
        ...item,
        imageUrl: `https://picsum.photos/id/${idx + 10}/600/400`,
        category: ['Social', 'Tech Talks', 'Music', 'Games', 'Workshops'][idx % 5],
        date: new Date(Date.now() + idx * 86400000).toISOString().slice(0, 10),
        userId: item.userId || 1,
      }));
      // Optionally filter by selectedCategory or selectedTimeTab
      let filtered = data;
      if (selectedCategory && selectedCategory !== 'All Events') {
        filtered = filtered.filter((item: any) => item.category === selectedCategory);
      }
      if (selectedTimeTab === 'Today') {
        const today = new Date().toISOString().slice(0, 10);
        filtered = filtered.filter((item: any) => item.date === today);
      } else if (selectedTimeTab === 'Tomorrow') {
        const tmr = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
        filtered = filtered.filter((item: any) => item.date === tmr);
      }
      setPosts(filtered);
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
      // Simulate a successful post creation (JSONPlaceholder will return a fake response)
      const res = await fetch(`${API_BASE_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPost.title,
          body: newPost.body,
          category: newPost.category || selectedCategory,
          imageUrl: newPost.imageUrl,
          date: new Date().toISOString().slice(0, 10),
          userId: 1,
        })
      });
      // Add the new post locally for UI feedback
      const fakePost = {
        id: Math.floor(Math.random() * 100000),
        title: newPost.title,
        body: newPost.body,
        category: newPost.category || selectedCategory,
        imageUrl: newPost.imageUrl || `https://picsum.photos/id/${Math.floor(Math.random()*100)}/600/400`,
        date: new Date().toISOString().slice(0, 10),
        userId: 1,
      };
      setPosts([fakePost, ...posts]);
      // setShowModal(false); // Removed
      setNewPost({ title: '', body: '', category: '', imageUrl: '' });
    } catch (err) {
      alert('Failed to create post.');
    } finally {
      setSubmitting(false);
    }
  };

  // const handlePickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     quality: 0.7,
  //   });
  //   if (!result.canceled && result.assets && result.assets[0]) {
  //     setImageUploading(true);
  //     const localUri = result.assets[0].uri;
  //     const filename = localUri.split('/').pop();
  //     const formData = new FormData();
  //     formData.append('file', {
  //       uri: localUri,
  //       name: filename,
  //       type: 'image/jpeg',
  //     });
  //     try {
  //       const res = await fetch(`${API_BASE_URL}/api/posts/upload-image`, {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //         body: formData,
  //       });
  //       const data = await res.json();
  //       setNewPost({ ...newPost, imageUrl: data.url });
  //     } catch (err) {
  //       alert('Image upload failed.');
  //     } finally {
  //       setImageUploading(false);
  //     }
  //   }
  // };

  const handlePressPost = (post: PostType) => {
    // Navigate to PostDetailScreen with all post fields as params
    router.push({
      pathname: '/PostDetailScreen',
      params: {
        id: post.id.toString(),
        title: post.title,
        body: post.body,
        imageUrl: post.imageUrl || '',
        category: post.category || '',
        date: post.date || '',
        userId: post.userId ? post.userId.toString() : '',
      },
    });
  };

  const handleToggleBookmark = (postId: number) => {
    setActiveBookmarks(prev => ({ ...prev, [postId]: !prev[postId] }));
  };
  const handleToggleConnect = (postId: number) => {
    setActiveConnects(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTimeTab, selectedCategory]);

  const renderItem = ({ item }: { item: Post }) => (
    <Pressable onPress={() => handlePressPost(item)}>
      <View style={[styles.card, { backgroundColor: isDark ? '#1c1c1e' : '#f4f4f4' }]}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: `https://picsum.photos/id/${item.id}/600/400` }}
            style={styles.image}
          />
          <View style={styles.iconOverlay}>
            <TouchableOpacity onPress={() => handleToggleBookmark(item.id)}>
              <Feather name="bookmark" size={22} color={activeBookmarks[item.id] ? '#6D0080' : 'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginLeft: 16 }} onPress={() => handleToggleConnect(item.id)}>
              <FontAwesome name="user-plus" size={22} color={activeConnects[item.id] ? '#00C853' : 'white'} />
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
            <Text style={[styles.authorText, { color: isDark ? '#aaa' : '#666' }]}>@dailyed</Text>
          </View>
        </View>
      </View>
    </Pressable>
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
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Create New Post</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Title"
              value={newPost.title}
              onChangeText={(text) => setNewPost({ ...newPost, title: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Body"
              value={newPost.body}
              onChangeText={(text) => setNewPost({ ...newPost, body: text })}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Category (e.g., Social, Tech Talks)"
              value={newPost.category}
              onChangeText={(text) => setNewPost({ ...newPost, category: text })}
            />
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => {
                // handlePickImage(); // Uncomment if image upload is implemented
                handleCreatePost();
              }}
              disabled={submitting || imageUploading}
            >
              {submitting || imageUploading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.uploadBtnText}>Create Post</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.uploadBtn}
              onPress={() => setShowModal(false)}
              disabled={submitting || imageUploading}
            >
              <Text style={styles.uploadBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* Post Details Modal */}
      {/* Removed Post Details Modal */}
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
  detailsModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  detailsGlassBg: {
    width: '90%',
    borderRadius: 24,
    overflow: 'hidden',
    alignItems: 'center',
  },
  detailsContent: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
  },
  detailsImage: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 18,
  },
  detailsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6D0080',
    marginBottom: 10,
    textAlign: 'center',
  },
  detailsBody: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  detailsCloseBtn: {
    position: 'absolute',
    top: 10,
    right: 16,
    zIndex: 2,
    padding: 8,
  },
  sectionSpacing: {
    height: 16,
  },
  hr: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '100%',
    marginVertical: 8,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  hostAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  hostName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#6D0080',
  },
  hostRole: {
    fontSize: 13,
    color: '#888',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6D0080',
    marginBottom: 6,
    marginTop: 2,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  chip: {
    backgroundColor: '#f0e6fa',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 6,
  },
  chipText: {
    color: '#6D0080',
    fontWeight: 'bold',
    fontSize: 13,
  },
  relatedCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    alignItems: 'center',
  },
  relatedImage: {
    width: 120,
    height: 70,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  relatedTitle: {
    fontSize: 13,
    color: '#333',
    padding: 6,
    textAlign: 'center',
  },
  moreImage: {
    width: 110,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default ExploreContentInfo;
