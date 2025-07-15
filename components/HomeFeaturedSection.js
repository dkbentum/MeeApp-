
// FeaturedSection.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DARK_PURPLE = '#4B0082';

const FeaturedSection = () => (
  <View style={styles.wrapper}>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🔥 Featured Events</Text>
      <Text style={styles.sectionText}>Don’t miss out on trending events in your city</Text>
    </View>
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>👑 Popular Groups</Text>
      <Text style={styles.sectionText}>Join groups with the most active members</Text>
    </View>
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
});

export default FeaturedSection;