import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme, TextInput, ActivityIndicator, Alert } from 'react-native';

const PURPLE = '#6A0DAD';
const LIGHT_PURPLE = '#F2E8FF';
const DARK_PURPLE = '#4B0082';
const DARK_BG = '#2C1A3B';
const DARK_TEXT = '#E2D9F9';
const DARK_GRAY = '#AAA';

const GroupSection = () => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  // State for group creation
  const [groupName, setGroupName] = useState('');
  const [creating, setCreating] = useState(false);
  const [joinGroupId, setJoinGroupId] = useState('');
  const [joining, setJoining] = useState(false);

  const handleCreateGroup = async () => {
    if (!groupName) return;
    setCreating(true);
    try {
      const res = await fetch('https://meeapp.onrender.com/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: groupName })
      });
      if (!res.ok) throw new Error('Failed to create group');
      Alert.alert('Success', 'Group created!');
      setGroupName('');
    } catch (err) {
      Alert.alert('Error', 'Failed to create group.');
    } finally {
      setCreating(false);
    }
  };

  const handleJoinGroup = async () => {
    if (!joinGroupId) return;
    setJoining(true);
    try {
      const res = await fetch(`https://meeapp.onrender.com/api/groups/${joinGroupId}/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('Failed to join group');
      Alert.alert('Success', 'Joined group!');
      setJoinGroupId('');
    } catch (err) {
      Alert.alert('Error', 'Failed to join group.');
    } finally {
      setJoining(false);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your groups</Text>
        <Text style={styles.sectionText}>You have not joined any groups</Text>
        <Text style={styles.link}>Discover groups</Text>
      </View>
      <TouchableOpacity style={styles.groupStart}>
        <Text style={styles.groupTitle}>🏆 Start a new group</Text>
        <Text style={styles.groupText}>Organize your own CNETs and WK sessions</Text>
      </TouchableOpacity>
      {/* Group creation UI */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Create Group</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
          placeholder="Group Name"
          value={groupName}
          onChangeText={setGroupName}
        />
        <TouchableOpacity style={{ backgroundColor: PURPLE, borderRadius: 8, padding: 10, alignItems: 'center' }} onPress={handleCreateGroup} disabled={creating}>
          {creating ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: 'bold' }}>Create</Text>}
        </TouchableOpacity>
      </View>
      {/* Group join UI */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Join Group</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 8, marginBottom: 8 }}
          placeholder="Group ID"
          value={joinGroupId}
          onChangeText={setJoinGroupId}
        />
        <TouchableOpacity style={{ backgroundColor: PURPLE, borderRadius: 8, padding: 10, alignItems: 'center' }} onPress={handleJoinGroup} disabled={joining}>
          {joining ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: 'bold' }}>Join</Text>}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    wrapper: {
      marginBottom: 40,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: isDark ? DARK_TEXT : DARK_PURPLE,
      marginBottom: 10,
    },
    sectionText: {
      fontSize: 15,
      color: isDark ? DARK_GRAY : '#666',
    },
    link: {
      fontSize: 15,
      color: PURPLE,
      marginTop: 6,
      fontWeight: '600',
    },
    groupStart: {
      backgroundColor: isDark ? DARK_BG : LIGHT_PURPLE,
      padding: 20,
      borderRadius: 14,
    },
    groupTitle: {
      fontSize: 17,
      fontWeight: '700',
      color: PURPLE,
    },
    groupText: {
      fontSize: 14,
      color: isDark ? '#CCC' : '#555',
    },
  });

export default GroupSection;
