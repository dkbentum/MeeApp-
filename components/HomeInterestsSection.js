// InterestsSection.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PURPLE = '#6A0DAD';
const LIGHT_PURPLE = '#F2E8FF';

const InterestsSection = ({ interests }) => (
  <View style={styles.section}>
    <View style={styles.header}>
      <Text style={styles.sectionTitle}>Your interests</Text>
      <Text style={styles.link}>Edit</Text>
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

const styles = StyleSheet.create({
  section: {
    marginBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#4B0082',
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
    backgroundColor: LIGHT_PURPLE,
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