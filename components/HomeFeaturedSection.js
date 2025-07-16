import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

const DARK_PURPLE = '#4B0082';
const DARK_TEXT = '#E1D9FF';
const DARK_SUBTEXT = '#AAAAAA';

const FeaturedSection = () => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  return (
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
      color: isDark ? DARK_SUBTEXT : '#666',
    },
  });

export default FeaturedSection;
