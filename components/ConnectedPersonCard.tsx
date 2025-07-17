import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, useColorScheme } from 'react-native';

type Props = {
  name: string;
  title: string;
  avatar: any; // image source
  onPress?: () => void;
};

const ConnectedPersonCard = ({ name, title, avatar, onPress }: Props) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#1E1E1E' : '#fff' }]}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.details}>
        <Text style={[styles.name, { color: isDark ? '#fff' : '#222' }]}>{name}</Text>
        <Text style={[styles.title, { color: isDark ? '#AAA' : '#666' }]}>{title}</Text>
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? '#6A0DAD' : '#6A0DAD' }]} onPress={onPress}>
        <Text style={styles.buttonText}>Message</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 14,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  title: {
    fontSize: 13,
    marginTop: 2,
  },
  button: {
    backgroundColor: '#6A0DAD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default ConnectedPersonCard;
