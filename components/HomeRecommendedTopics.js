// RecommendedTopics.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DARK_PURPLE = '#4B0082';

const RecommendedTopics = ({ topics }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>🧠 Recommended Topics</Text>
    {topics.map((topic, index) => (
      <Text style={styles.bulletText} key={index}>• {topic}</Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  section: {
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: DARK_PURPLE,
    marginBottom: 10,
  },
  bulletText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 6,
  },
});

export default RecommendedTopics;