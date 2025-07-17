import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('Dandelion Kwame Bentum');
  const [email, setEmail] = useState('dandelion@example.com');
  const [bio, setBio] = useState('Nerdy student at KNUST 🚀 | Building billion-dollar ideas 👨🏽‍💻 | Making chips & machines go brrr ⚡⚡');
  const [interests, setInterests] = useState([
    'AI', 'React Native', 'Gaming', 'Robotics', 'Space', 'Music', 'Hacking',
  ]);
  const [newInterest, setNewInterest] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addInterest = () => {
    if (newInterest.trim()) {
      setInterests([...interests, newInterest.trim()]);
      setNewInterest('');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <Ionicons name="settings-outline" size={24} color="white" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>

          {/* Profile Info */}
          <Text style={styles.label}>FULL NAME</Text>
          <TextInput
            style={styles.cardText}
            value={name}
            onChangeText={setName}
            placeholder="Full Name"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.cardText}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            placeholderTextColor="#aaa"
          />

          <Text style={styles.label}>BIO</Text>
          <TextInput
            style={styles.bio}
            value={bio}
            onChangeText={setBio}
            placeholder="Bio"
            placeholderTextColor="#aaa"
            multiline
          />

          {/* Interests */}
          <Text style={styles.label}>INTERESTS</Text>
          <View style={styles.interestsWrapper}>
            {interests.map((item, index) => (
              <View key={index} style={styles.interestTag}>
                <Text style={styles.interestText}>{item}</Text>
              </View>
            ))}
          </View>

          {/* Add Interest */}
          <View style={styles.addInterest}>
            <TextInput
              style={styles.input}
              value={newInterest}
              onChangeText={setNewInterest}
              placeholder="Add interest"
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity style={styles.addBtn} onPress={addInterest}>
              <Text style={styles.addBtnText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Follower Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>2.3k</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>180</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>

          {/* Edit Button */}
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>

          {/* Logout */}
          <TouchableOpacity onPress={() => console.log('Logging out...')}>
            <Text style={styles.logout}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A0DAD', // Purple
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#ffffff10',
    borderRadius: 20,
    padding: 20,
  },
  label: {
    color: '#D8B9FF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 10,
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    borderBottomColor: '#ffffff30',
    borderBottomWidth: 1,
    paddingBottom: 4,
  },
  bio: {
    color: 'white',
    fontSize: 16,
    padding: 12,
    backgroundColor: '#ffffff10',
    borderRadius: 12,
    marginBottom: 16,
  },
  interestsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  interestTag: {
    backgroundColor: '#EEE0FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: '#6A0DAD',
    fontWeight: '500',
  },
  addInterest: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#ffffff15',
    color: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  addBtn: {
    marginLeft: 10,
    backgroundColor: '#9B30FF',
    padding: 10,
    borderRadius: 10,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  statBox: {
    backgroundColor: '#ffffff10',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#D8B9FF',
    fontSize: 14,
  },
  editBtn: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  editBtnText: {
    color: '#6A0DAD',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logout: {
    color: '#DDA0DD',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
