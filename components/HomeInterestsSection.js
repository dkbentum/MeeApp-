import React from 'react';
import { View, Text, ScrollView, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const PURPLE = '#6A0DAD';
const LIGHT_PURPLE = '#F2E8FF';
const DARK_TAG_BG = '#2D1B3A';
const DARK_TEXT = '#E1D9FF';

const InterestsSection = ({ interests }) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);
  const router = useRouter();

  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.sectionTitle}>Your interests</Text>
        <TouchableOpacity onPress={() => router.push('/profile')}>
          <Text style={styles.link}>Edit</Text>
        </TouchableOpacity>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scroll}>
        <View style={styles.tagWrap}>
          {interests.map((tag, index) => (
            <View style={styles.tag} key={index}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    section: {
      marginBottom: 40,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '800',
      color: isDark ? DARK_TEXT : '#4B0082',
    },
    link: {
      fontSize: 15,
      color: PURPLE,
      fontWeight: '600',
    },
    scroll: {
      marginTop: 8,
    },
    tagWrap: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    tag: {
      backgroundColor: isDark ? DARK_TAG_BG : LIGHT_PURPLE,
      borderColor: PURPLE,
      borderWidth: 1.5,
      borderRadius: 20,
      paddingHorizontal: 18,
      paddingVertical: 8,
      marginRight: 10,
      marginBottom: 10,
    },
    tagText: {
      color: PURPLE,
      fontWeight: '700',
      fontSize: 15,
    },
  });

export default InterestsSection;
