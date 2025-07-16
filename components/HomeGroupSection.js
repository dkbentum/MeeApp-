import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

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

  return (
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
