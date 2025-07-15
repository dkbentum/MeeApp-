// GroupSection.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const PURPLE = '#6A0DAD';
const LIGHT_PURPLE = '#F2E8FF';
const DARK_PURPLE = '#4B0082';

const GroupSection = () => (
  <View style={styles.wrapper}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Your groups</Text>
      <Text style={styles.sectionText}>You have not joined any groups</Text>
      <Text style={styles.link}>Discover groups</Text>
    </View>
    <TouchableOpacity style={styles.groupStart}>
      <Text style={styles.groupTitle}>🏆 Start a new group</Text>
      <Text style={styles.groupText}>Organize your own events</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 40,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: DARK_PURPLE,
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 15,
    color: '#666',
  },
  link: {
    fontSize: 15,
    color: PURPLE,
    marginTop: 6,
    fontWeight: '600',
  },
  groupStart: {
    backgroundColor: LIGHT_PURPLE,
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
    color: '#555',
  },
});

export default GroupSection;