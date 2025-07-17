import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MutualSkillsCard = ({ skills }: { skills: string[] }) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#1F1F1F' : '#f3e8ff' }]}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/imagesE.png')}
          style={styles.image}
        />
        <Text style={[styles.title, { color: isDark ? '#fff' : '#4B0082' }]}>
         Shared Skills
        </Text>
        <Ionicons
          name="information-circle-outline"
          size={20}
          color={isDark ? '#fff' : '#4B0082'}
          style={styles.icon}
        />
      </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 8,
    marginRight: 10,
  },
  icon: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
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
