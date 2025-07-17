// ConnectButton.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const PURPLE = '#6A0DAD';

const ConnectButton = () => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.button} onPress={() => router.push('/(tabs)/explore')}>
      <Text style={styles.buttonText}>🤝 Connect & Work</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    marginBottom: 60,
    backgroundColor: PURPLE,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ConnectButton;
