import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

const DARK_PURPLE = '#4B0082';

const RecommendedTopics = ({ topics }) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>🧠 Recommended Topics</Text>
      {topics.map((topic, index) => (
        <Text style={styles.bulletText} key={index}>• {topic}</Text>
      ))}
    </View>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    section: {
      marginBottom: 40,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: isDark ? '#E0D4FF' : DARK_PURPLE,
      marginBottom: 10,
    },
    bulletText: {
      fontSize: 15,
      color: isDark ? '#CCCCCC' : '#444',
      marginBottom: 6,
    },
  });

export default RecommendedTopics;
