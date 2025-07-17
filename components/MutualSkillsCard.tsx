import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

const MutualSkillsCard = ({ skills }: { skills: string[] }) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#1F1F1F' : '#f3e8ff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#4B0082' }]}>💡 Shared Skills</Text>
      <View style={styles.skillList}>
        {skills.map((skill, idx) => (
          <Text key={idx} style={[styles.skill, { backgroundColor: isDark ? '#333' : '#fff' }]}>
            {skill}
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  skill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    fontSize: 13,
    fontWeight: '600',
    marginRight: 6,
    marginBottom: 6,
    color: '#6A0DAD',
  },
});

export default MutualSkillsCard;
