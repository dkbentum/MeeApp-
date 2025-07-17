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
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const TECH_STACK = [
  { name: 'React', icon: <FontAwesome5 name="react" size={22} color="#61DBFB" /> },
  { name: 'Node.js', icon: <FontAwesome5 name="node-js" size={22} color="#8CC84B" /> },
  { name: 'Python', icon: <FontAwesome5 name="python" size={22} color="#FFD43B" /> },
  { name: 'Java', icon: <FontAwesome5 name="java" size={22} color="#E76F00" /> },
  { name: 'AI', icon: <MaterialCommunityIcons name="robot" size={22} color="#9B30FF" /> },
];

const ACHIEVEMENTS = [
  { icon: 'trophy', text: 'Won Hackathon 2024' },
  { icon: 'robot', text: 'Built a GPT-powered chatbot' },
  { icon: 'rocket', text: 'Launched 3 side projects' },
];

const SUBTLE_PURPLE = '#4B2066';
const SUBTLE_CARD = '#2D1B3A';
const SUBTLE_ACCENT = '#7C4DFF';
const SUBTLE_TEXT = '#E0D4FF';
const SUBTLE_TAG = '#5E3A7A';

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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Picture & Name */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrapper}>
            <Image
              source={image ? { uri: image } : require('../assets/images/p1.jpg')}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatar} onPress={pickImage}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.email}>{email}</Text>
          <View style={styles.geekBadge}>
            <MaterialCommunityIcons name="alien" size={16} color="#fff" />
            <Text style={styles.geekBadgeText}>Level 7 Coder</Text>
          </View>
        </View>

        {/* Bio Card */}
        <View style={styles.bioCard}>
          <Ionicons name="quote" size={20} color="#9B30FF" style={{ marginRight: 8 }} />
          <Text style={styles.bioText}>{bio}</Text>
        </View>

        {/* Interests */}
        <Text style={styles.sectionTitle}>Interests</Text>
        <View style={styles.interestsWrapper}>
          {interests.map((item, index) => (
            <View key={index} style={styles.interestTag}>
              <MaterialCommunityIcons name="star-four-points" size={14} color="#fff" style={{ marginRight: 4 }} />
              <Text style={styles.interestText}>{item}</Text>
            </View>
          ))}
        </View>
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

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="people" size={20} color="#fff" style={{ marginBottom: 4 }} />
            <Text style={styles.statNumber}>2.3k</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="person-add" size={20} color="#fff" style={{ marginBottom: 4 }} />
            <Text style={styles.statNumber}>180</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>

        {/* Tech Stack */}
        <Text style={styles.sectionTitle}>Tech Stack</Text>
        <View style={styles.techStackWrapper}>
          {TECH_STACK.map((item, idx) => (
            <View key={idx} style={styles.techIconBox}>
              {item.icon}
              <Text style={styles.techName}>{item.name}</Text>
            </View>
          ))}
        </View>

        {/* Achievements */}
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        <View style={styles.achievementsWrapper}>
          {ACHIEVEMENTS.map((ach, idx) => (
            <View key={idx} style={styles.achievementBox}>
              <MaterialCommunityIcons name={ach.icon} size={20} color="#FFD700" style={{ marginRight: 8 }} />
              <Text style={styles.achievementText}>{ach.text}</Text>
            </View>
          ))}
        </View>

        {/* Edit & Logout Buttons */}
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editBtnText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log('Logging out...')}>
          <Text style={styles.logout}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: SUBTLE_PURPLE,
    paddingTop: 60,
    paddingHorizontal: 0,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: SUBTLE_ACCENT,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: SUBTLE_ACCENT,
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: SUBTLE_CARD,
  },
  name: {
    color: SUBTLE_TEXT,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  email: {
    color: '#B39DDB',
    fontSize: 15,
    marginBottom: 6,
  },
  geekBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SUBTLE_TAG,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
    marginBottom: 8,
  },
  geekBadgeText: {
    color: SUBTLE_TEXT,
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '600',
  },
  bioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SUBTLE_CARD,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  bioText: {
    color: SUBTLE_TEXT,
    fontSize: 15,
    fontStyle: 'italic',
    flex: 1,
  },
  sectionTitle: {
    color: SUBTLE_TEXT,
    fontSize: 17,
    fontWeight: 'bold',
    marginLeft: 18,
    marginBottom: 8,
    marginTop: 10,
  },
  interestsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 18,
    marginBottom: 10,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SUBTLE_TAG,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  interestText: {
    color: SUBTLE_TEXT,
    fontWeight: '500',
    fontSize: 14,
  },
  addInterest: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#3C2952',
    color: SUBTLE_TEXT,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 16,
  },
  addBtn: {
    marginLeft: 10,
    backgroundColor: SUBTLE_ACCENT,
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
    marginHorizontal: 18,
    marginVertical: 20,
  },
  statBox: {
    backgroundColor: SUBTLE_CARD,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 4,
  },
  statNumber: {
    color: SUBTLE_TEXT,
    fontSize: 22,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#B39DDB',
    fontSize: 14,
  },
  techStackWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 18,
    marginBottom: 10,
  },
  techIconBox: {
    alignItems: 'center',
    marginRight: 18,
    marginBottom: 10,
    backgroundColor: SUBTLE_CARD,
    borderRadius: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  techName: {
    color: SUBTLE_TEXT,
    fontWeight: '600',
    fontSize: 13,
    marginTop: 4,
  },
  achievementsWrapper: {
    marginHorizontal: 18,
    marginBottom: 18,
  },
  achievementBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: SUBTLE_CARD,
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  achievementText: {
    color: SUBTLE_TEXT,
    fontWeight: '500',
    fontSize: 14,
  },
  editBtn: {
    backgroundColor: SUBTLE_CARD,
    marginHorizontal: 18,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 18,
    shadowColor: SUBTLE_ACCENT,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  editBtnText: {
    color: SUBTLE_ACCENT,
    fontWeight: 'bold',
    fontSize: 18,
  },
  logout: {
    color: SUBTLE_TEXT,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 30,
  },
});
