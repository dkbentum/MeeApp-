import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Button, Image, TouchableOpacity, Platform, ActivityIndicator, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useColorScheme } from '@/components/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export default function CreateWKPostScreen() {
  const router = useRouter();
  const isDark = useColorScheme() === 'dark';
  const [newPost, setNewPost] = useState({ title: '', body: '', category: '', imageUrl: '' });
  const [submitting, setSubmitting] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);

  const handleCreatePost = async () => {
    setSubmitting(true);
    try {
      await fetch(`${API_BASE_URL}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newPost.title,
          body: newPost.body,
          category: newPost.category,
          imageUrl: newPost.imageUrl,
          date: new Date().toISOString().slice(0, 10),
          authorId: 1 // For demo, use 1. Replace with real user id in production.
        })
      });
      router.back();
    } catch (err) {
      alert('Failed to create post.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: isDark ? '#1A1333' : '#F6F0FF' }]}>  
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={28} color={isDark ? '#fff' : '#6D0080'} />
        <Text style={[styles.backText, { color: isDark ? '#fff' : '#6D0080' }]}>Back</Text>
      </TouchableOpacity>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#6D0080' }]}>Create WK-Post</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor={isDark ? '#bbb' : '#888'}
        value={newPost.title}
        onChangeText={t => setNewPost({ ...newPost, title: t })}
      />
      <TextInput
        style={[styles.input, { height: 80 }]}
        placeholder="Body"
        placeholderTextColor={isDark ? '#bbb' : '#888'}
        value={newPost.body}
        onChangeText={t => setNewPost({ ...newPost, body: t })}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Category (optional)"
        placeholderTextColor={isDark ? '#bbb' : '#888'}
        value={newPost.category}
        onChangeText={t => setNewPost({ ...newPost, category: t })}
      />
      {/* Image upload can be added here if needed */}
      {newPost.imageUrl ? (
        <Image source={{ uri: newPost.imageUrl }} style={{ width: '100%', height: 120, borderRadius: 8, marginBottom: 10 }} />
      ) : null}
      <View style={styles.btnRow}>
        <Button title="Cancel" color="#888" onPress={() => router.back()} />
        <Button title={submitting ? 'Posting...' : 'Post'} onPress={handleCreatePost} disabled={submitting} />
      </View>
      {submitting && <ActivityIndicator style={{ marginTop: 16 }} color={isDark ? '#fff' : '#6D0080'} />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    paddingTop: Platform.OS === 'android' ? 32 : 48,
    alignItems: 'center',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  backText: {
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 18,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 14,
    backgroundColor: '#fff',
    color: '#222',
    fontSize: 16,
  },
  btnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
}); 