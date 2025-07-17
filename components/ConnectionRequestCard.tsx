import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, useColorScheme, Image } from 'react-native';

const ConnectionRequestCard = ({ name, avatar, onAccept, onIgnore }: any) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#1e1e1e' : '#fff' }]}>
      <Image source={avatar} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={[styles.name, { color: isDark ? '#fff' : '#000' }]}>{name}</Text>
        <Text style={[styles.text, { color: isDark ? '#bbb' : '#555' }]}>wants to connect with you</Text>
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={onAccept} style={[styles.button, styles.accept]}>
          <Text style={styles.buttonText}>Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onIgnore} style={[styles.button, styles.ignore]}>
          <Text style={styles.buttonText}>Ignore</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 10,
  },
  info: {
    marginBottom: 10,
  },
  name: {
    fontWeight: '700',
    fontSize: 16,
  },
  text: {
    fontSize: 14,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  accept: {
    backgroundColor: '#6A0DAD',
  },
  ignore: {
    backgroundColor: '#bbb',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default ConnectionRequestCard;
