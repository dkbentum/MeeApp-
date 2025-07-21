import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Modal,
  FlatList,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import ProfileHeader from '../components/ProfileHeader';
import { useAuth } from '../components/AuthContext';
import { useRouter } from 'expo-router';
import { useColorScheme } from '../components/useColorScheme';
import { useInterests } from '../components/InterestsContext';

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
  { icon: 'rocket-outline', text: 'Launched 3 side projects' },
];

const SUBTLE_PURPLE = '#4B2066';
const SUBTLE_CARD = '#2D1B3A';
const SUBTLE_ACCENT = '#7C4DFF';
const SUBTLE_TEXT = '#E0D4FF';
const SUBTLE_TAG = '#5E3A7A';

const ALL_INTERESTS = [
  'AI', 'Fitness', 'Startups','Electronics', 'Music', 'Gaming', 'Tech Talks',
  'Design', 'Photography', 'Spirituality', 'financing','investing', 'Health', 'Entrepreneurship', 'Networking',
  'Art', 'Writing','UI/UX', 'Product Design','robotics', 'Cooking', 'Sports', 'Science', 'Movies', 'Books','other',
];

const ProfileScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');
  const [newInterest, setNewInterest] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { interests, setInterests } = useInterests();

  // 🎯 Fetch dummy profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const data = await res.json();
        setName(data.name);
        setEmail(data.email);
        setBio(`Hi, I'm ${data.name}. I’m from ${data.address.city}, and I work at ${data.company.name}.`);
      } catch (err) {
        console.error('Failed to fetch profile data:', err);
      }
    };

    fetchProfile();
  }, []);

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

  const handleAddInterest = (interest: string) => {
    if (!interests.includes(interest)) {
      setInterests([...interests, interest]);
    }
    setShowInterestModal(false);
  };

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const handleEdit = () => setEditMode(true);
  const handleCancel = () => setEditMode(false);
  const handleSave = () => {
    // You can POST updated data to your backend here
    setEditMode(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      {/* Top section: profile picture only */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee', position: 'relative' }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
          <ProfileHeader name={name} email={email} image={image} onEditAvatar={pickImage} showName={false} showEmail={false} />
          {/* Overlay name and email on image */}
          <View style={{ position: 'absolute', bottom: 32, left: 0, right: 0, alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 20, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>{name}</Text>
            <Text style={{ color: '#fff', fontSize: 14, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 }}>{email}</Text>
          </View>
        </View>
      </View>
      {/* Bottom section: all details with curved top corners */}
      <View style={{ flex: 3, backgroundColor: '#fff', borderTopLeftRadius: 32, borderTopRightRadius: 32, overflow: 'hidden', marginTop: -24 }}>
        <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff' }}>
          {/* About Me section */}
          <Text style={[styles.sectionTitle, { marginTop: 0 }]}>About Me</Text>
          <Text style={{ color: '#888', fontSize: 13, marginHorizontal: 18, marginBottom: 8 }}>
            Introduce yourself to others on CNETWK. This can be short and simple.
          </Text>
          <View style={{ marginHorizontal: 18, marginBottom: 18 }}>
            {editMode ? (
              <View style={{ borderWidth: 1, borderColor: '#bbb', borderStyle: 'dashed', borderRadius: 10, padding: 10, minHeight: 60, justifyContent: 'center' }}>
                <TextInput
                  style={[styles.bioText, { backgroundColor: 'transparent', borderRadius: 8, padding: 0, color: '#222', minHeight: 40 }]}
                  value={bio}
                  onChangeText={setBio}
                  multiline
                  placeholder="Add bio"
                  placeholderTextColor="#bbb"
                />
              </View>
            ) : (
              bio.trim() ? (
                <View style={{ backgroundColor: '#f5f5f5', borderRadius: 12, padding: 14 }}>
                  <Text style={[styles.bioText, { color: '#222' }]}>{bio}</Text>
                </View>
              ) : (
                <View style={{ borderWidth: 1, borderColor: '#bbb', borderStyle: 'dashed', borderRadius: 10, padding: 16, alignItems: 'center', minHeight: 60, justifyContent: 'center' }}>
                  <Text style={{ color: '#bbb', fontSize: 15 }}>Add bio</Text>
                </View>
              )
            )}
          </View>

          {/* Member section: vertical list of groups only */}
          <View style={{ backgroundColor: '#f5f5f5', borderRadius: 12, padding: 0, marginHorizontal: 18, marginBottom: 18, overflow: 'hidden' }}>
            <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 16, paddingHorizontal: 18, paddingTop: 18, paddingBottom: 4 }}>Member</Text>
            {['React Devs', 'AI Researchers', 'Product Managers'].map((group, idx) => (
              <View key={idx} style={{ paddingVertical: 16, paddingHorizontal: 18, borderBottomWidth: idx < 2 ? 1 : 0, borderBottomColor: '#e0e0e0' }}>
                <Text style={{ color: '#222', fontWeight: '500', fontSize: 15 }}>{group}</Text>
              </View>
            ))}
          </View>

          {/* Interests in gray card */}
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={{ backgroundColor: '#f5f5f5', borderRadius: 12, padding: 14, marginHorizontal: 18, marginBottom: 18, minHeight: 60, flexDirection: 'row', alignItems: 'center' }}>
            <FlatList
              data={interests}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <View style={[styles.interestTag, { backgroundColor: '#e0e0e0' }]}>
                  <MaterialCommunityIcons name="star-four-points" size={14} color="#222" style={{ marginRight: 4 }} />
                  <Text style={[styles.interestText, { color: '#222' }]}>{item}</Text>
                </View>
              )}
              showsHorizontalScrollIndicator={false}
              style={{ flex: 1 }}
            />
            <TouchableOpacity style={{ marginLeft: 10, backgroundColor: '#222', borderRadius: 16, padding: 8 }} onPress={() => setShowInterestModal(true)}>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>+</Text>
            </TouchableOpacity>
          </View>
          {/* Interests Modal */}
          <Modal
            visible={showInterestModal}
            animationType="slide"
            transparent
            onRequestClose={() => setShowInterestModal(false)}
          >
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.25)' }}>
              <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, minHeight: 320 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#222' }}>Select Interests</Text>
                <FlatList
                  data={ALL_INTERESTS}
                  numColumns={3}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        backgroundColor: interests.includes(item) ? '#222' : '#f5f5f5',
                        borderRadius: 16,
                        paddingHorizontal: 14,
                        paddingVertical: 10,
                        margin: 6,
                      }}
                      onPress={() => handleAddInterest(item)}
                      disabled={interests.includes(item)}
                    >
                      <Text style={{ color: interests.includes(item) ? '#fff' : '#222', fontWeight: '600' }}>{item}</Text>
                    </TouchableOpacity>
                  )}
                  contentContainerStyle={{ alignItems: 'flex-start' }}
                />
                <TouchableOpacity style={{ marginTop: 18, alignSelf: 'center' }} onPress={() => setShowInterestModal(false)}>
                  <Text style={{ color: '#222', fontWeight: 'bold', fontSize: 16 }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {editMode ? (
            <View style={{ flexDirection: 'row', marginHorizontal: 18, marginBottom: 18, gap: 12 }}>
              <TouchableOpacity style={[styles.editBtn, { flex: 1, backgroundColor: '#222' }]} onPress={handleSave}>
                <Text style={[styles.editBtnText, { color: '#fff' }]}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.editBtn, { flex: 1, backgroundColor: '#bbb' }]} onPress={handleCancel}>
                <Text style={[styles.editBtnText, { color: '#222' }]}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={[styles.editBtn, { backgroundColor: '#222' }]} onPress={handleEdit}>
              <Text style={[styles.editBtnText, { color: '#fff' }]}>Edit Profile</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
            <Text style={[styles.logoutText, { color: '#222' }]}>Log Out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2D1B3A',
    borderRadius: 16,
    padding: 14,
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  bioText: {
    color: '#E0D4FF',
    fontSize: 15,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 18,
    marginTop: 18,
    marginBottom: 6,
  },
  interestsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 18,
    marginBottom: 8,
  },
  interestTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5E3A7A',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  interestText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  addInterest: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 18,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#7C4DFF',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#3C2952',
    marginRight: 8,
  },
  addBtn: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#4B2066',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  statNumber: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    color: '#E0D4FF',
    fontSize: 13,
  },
  techStackWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 18,
    marginBottom: 8,
  },
  techIconBox: {
    alignItems: 'center',
    marginRight: 18,
    marginBottom: 8,
    backgroundColor: '#2D1B3A',
    borderRadius: 10,
    padding: 10,
    minWidth: 70,
  },
  techName: {
    color: '#E0D4FF',
    fontSize: 13,
    marginTop: 4,
    fontWeight: '600',
    textAlign: 'center',
  },
  achievementsWrapper: {
    marginHorizontal: 18,
    marginBottom: 18,
  },
  achievementBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3C2952',
    borderRadius: 10,
    padding: 10,
    marginBottom: 8,
  },
  achievementText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: '600',
  },
  editBtn: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginHorizontal: 18,
    marginTop: 18,
    marginBottom: 8,
  },
  editBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutBtn: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  logoutText: {
    color: '#222',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
});
