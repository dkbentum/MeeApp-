import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, FlatList as RNFlatList, useColorScheme } from 'react-native';
import { useState } from 'react';

export type Post = {
  id: number;
  title: string;
  body: string;
  imageUrl?: string;
  category?: string;
  date?: string;
  userId?: number;
};

type PostDetailsProps = {
  visible: boolean;
  post: Post | null;
  onClose: () => void;
  relatedPosts: Post[];
  isDark: boolean;
};

const PostDetails: React.FC<PostDetailsProps> = ({ visible, post, onClose, relatedPosts, isDark }) => {
  if (!post) return null;
  const styles = getStyles(isDark);
  const [isMember, setIsMember] = useState(false);
  const [joining, setJoining] = useState(false);

  const handleJoinGroup = async () => {
    setJoining(true);
    // Dummy API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsMember(true);
    setJoining(false);
    alert(`You successfully joined the ${post.title} WK-event!`);
  };
  return (
    <View style={styles.modalOverlay}>
      <View style={styles.cardBg}>
        <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.content}>
          {/* Post Image */}
          <Image
            source={{ uri: post.imageUrl || `https://picsum.photos/id/${post.id}/600/400` }}
            style={styles.image}
          />
          {/* Title */}
          <Text style={styles.title}>{post.title}</Text>
          <View style={styles.sectionSeparator} />
          {/* Date/Category */}
          <View style={styles.row}>
            {post.date && <Text style={styles.metaText}>📅 {post.date}</Text>}
            {post.category && <Text style={styles.metaText}>#{post.category}</Text>}
          </View>
          <View style={styles.sectionSeparator} />
          {/* About/Body */}
          <Text style={styles.heading}>About</Text>
          <Text style={styles.body}>{post.body}</Text>
          <View style={styles.sectionSeparator} />
          {/* Host */}
          <Text style={styles.heading}>Host</Text>
          <View style={styles.hostRow}>
            <Image
              source={{ uri: `https://i.pravatar.cc/60?u=${post.userId || post.id}` }}
              style={styles.hostAvatar}
            />
            <View style={{ marginLeft: 12 }}>
              <Text style={styles.hostName}>@dailyed</Text>
              <Text style={styles.hostRole}>CNET & WK Organizer</Text>
            </View>
          </View>
          <View style={styles.sectionSeparator} />
          {/* Action Button */}
          <TouchableOpacity
            style={[styles.actionButton, isMember && { backgroundColor: '#aaa' }]}
            onPress={handleJoinGroup}
            disabled={isMember || joining}
          >
            <Text style={styles.actionButtonText}>
              {isMember ? 'Joined' : (joining ? 'Joining...' : 'Join Group')}
            </Text>
          </TouchableOpacity>
          <View style={styles.sectionSeparator} />
          {/* Related Posts */}
          <Text style={styles.heading}>Related CNETs & WK</Text>
          <RNFlatList
            data={relatedPosts}
            horizontal
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.relatedCard}>
                <Image source={{ uri: item.imageUrl || `https://picsum.photos/id/${item.id}/200/120` }} style={styles.relatedImage} />
                <Text numberOfLines={2} style={styles.relatedTitle}>{item.title}</Text>
              </View>
            )}
            showsHorizontalScrollIndicator={false}
            style={{ marginVertical: 8 }}
          />
          <View style={{ height: 30 }} />
        </ScrollView>
      </View>
    </View>
  );
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDark ? 'rgba(24, 24, 40, 0.95)' : 'rgba(246, 240, 255, 0.98)',
  },
  cardBg: {
    width: '92%',
    borderRadius: 24,
    backgroundColor: isDark ? '#23203a' : '#fff',
    paddingBottom: 12,
    shadowColor: isDark ? '#000' : '#aaa',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 6,
    maxHeight: '92%',
  },
  content: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    paddingTop: 32,
  },
  closeBtn: {
    position: 'absolute',
    top: 10,
    right: 16,
    zIndex: 2,
    padding: 8,
  },
  closeText: {
    fontSize: 28,
    color: '#6D0080',
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 16,
    marginBottom: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6D0080',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    width: '100%',
    marginVertical: 14,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4a148c',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  body: {
    fontSize: 16,
    color: isDark ? '#E0D4FF' : '#333',
    textAlign: 'left',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 2,
  },
  metaText: {
    fontSize: 14,
    color: '#888',
    marginRight: 10,
  },
  hostRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    alignSelf: 'flex-start',
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
  actionButton: {
    backgroundColor: '#7e22ce',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 16,
    alignSelf: 'center',
    marginVertical: 8,
    shadowColor: '#7e22ce',
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
  relatedCard: {
    width: 120,
    marginRight: 12,
    backgroundColor: isDark ? '#2a223a' : '#f7f2ff',
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
});

export default PostDetails; 