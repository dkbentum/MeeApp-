
// SuggestionCard.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PURPLE = '#6A0DAD';
const DARK_PURPLE = '#4B0082';

const SuggestionCard = () => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>Get suggestions for events</Text>
    <Text style={styles.cardText}>You have 5 suggestions for upcoming events</Text>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>View suggested events</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 40,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: DARK_PURPLE,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  button: {
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SuggestionCard;