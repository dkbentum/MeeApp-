import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const HomeWelcomeCard = () => (
  <View style={styles.card}>
    <Image source={require('../assets/images/p1.jpg')} style={styles.avatar} />
    <View style={styles.textContainer}>
      <Text style={styles.greeting}>Welcome back!</Text>
      <Text style={styles.message}>Ready to connect and grow today?</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f7f6fd',
    borderRadius: 16,
    padding: 16,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6D0080',
    marginBottom: 2,
  },
  message: {
    fontSize: 15,
    color: '#555',
  },
});

export default HomeWelcomeCard; 