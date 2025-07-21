import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const MOCK_SKILLS = [
  'React', 'Node.js', 'UI Design', 'TypeScript', 'Python', 'Figma', 'AWS', 'Docker', 'GraphQL', 'Kotlin', 'Swift', 'C++', 'Machine Learning', 'Public Speaking', 'Teamwork', 'Agile', 'Jest', 'Expo', 'Redux', 'SQL',
];

const MutualSkillsCard = ({ skills = MOCK_SKILLS }: { skills?: string[] }) => {
  const isDark = useColorScheme() === 'dark';
  const [pressedSkill, setPressedSkill] = useState<string | null>(null);
  const styles = getStyles(isDark);

  const handleSkillPress = (skill: string) => {
    setPressedSkill(skill);
    Alert.alert('Skill Selected', `You tapped on "${skill}"`);
    setTimeout(() => setPressedSkill(null), 400);
  };

  return (
    <LinearGradient
      colors={isDark ? ['#2d1b3a', '#181828'] : ['#f3e8ff', '#fff']}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.header}>
        <Image
          source={require('../assets/images/imagesE.png')}
          style={styles.image}
        />
        <Text style={[styles.title, { color: isDark ? '#fff' : '#6D0080' }]}>Shared Skills</Text>
        <Ionicons
          name="information-circle-outline"
          size={20}
          color={isDark ? '#fff' : '#6D0080'}
          style={styles.icon}
        />
      </View>
      <View style={styles.skillList}>
        {skills.map((skill, idx) => (
          <Pressable
            key={idx}
            onPress={() => handleSkillPress(skill)}
            style={({ pressed }) => [
              styles.skill,
              pressedSkill === skill && styles.skillPressed,
              pressed && styles.skillPressed,
              { backgroundColor: isDark ? '#333' : '#fff' },
            ]}
          >
            <Text style={[styles.skillText, { color: isDark ? '#E0D4FF' : '#6A0DAD' }]}>{skill}</Text>
          </Pressable>
        ))}
      </View>
    </LinearGradient>
  );
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 20,
    marginBottom: 24,
    shadowColor: isDark ? '#000' : '#b39ddb',
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 12,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 8,
    marginRight: 12,
  },
  icon: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  skillList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  skill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 22,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1.5,
    borderColor: isDark ? '#4B0082' : '#E0D4FF',
    backgroundColor: isDark ? '#333' : '#fff',
    shadowColor: isDark ? '#000' : '#b39ddb',
    shadowOpacity: 0.10,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  skillPressed: {
    backgroundColor: '#7C4DFF',
    borderColor: '#7C4DFF',
  },
  skillText: {
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});

export default MutualSkillsCard;
