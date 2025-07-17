import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [name, setName] = useState('Dandelion');
  const [email, setEmail] = useState('dandelion@genz.com');
  const [bio, setBio] = useState('Just a cool human doing nerdy things.');
  const [interests, setInterests] = useState<string[]>(['Coding', 'Design', 'Music', 'Gaming']);
  const [newInterest, setNewInterest] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Ionicons name="camera" size={32} color="#9B30FF" />
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
        placeholderTextColor="#999"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        placeholderTextColor="#999"
      />
      <TextInput
        style={[styles.input, styles.bioInput]}
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
        placeholderTextColor="#999"
        multiline
      />

      <Text style={styles.sectionTitle}>Your Interests</Text>
      <ScrollView
        horizontal
        style={styles.scrollRow}
        contentContainerStyle={styles.interestsContainer}
        showsHorizontalScrollIndicator={false}
      >
        {interests.map((interest, index) => (
          <View key={index} style={styles.interestBadge}>
            <Text style={styles.interestText}>{interest}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.addInterestButton}
          onPress={() => {
            if (newInterest.trim()) {
              setInterests([...interests, newInterest]);
              setNewInterest('');
            }
          }}
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>

      <TextInput
        style={styles.input}
        value={newInterest}
        onChangeText={setNewInterest}
        placeholder="Add new interest"
        placeholderTextColor="#999"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 50 : 60,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#9B30FF',
  },
  profilePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#EDE7F6',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F3E8FF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    color: '#333',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  sectionTitle: {
    fontSize: 18,
    color: '#4B0082',
    marginVertical: 10,
    fontWeight: '600',
  },
  scrollRow: {
    marginBottom: 10,
  },
  interestsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interestBadge: {
    backgroundColor: '#E1BEE7',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  interestText: {
    color: '#4B0082',
    fontWeight: '500',
  },
  addInterestButton: {
    backgroundColor: '#9B30FF',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    marginBottom: 10,
  },
});
