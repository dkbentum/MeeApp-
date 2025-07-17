import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, useColorScheme } from 'react-native';

const ExploreConnectionsCard = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#4B0082' : '#D8B4FE' }]}>
      <Text style={[styles.text, { color: isDark ? '#fff' : '#1E1E1E' }]}>
        Meet new connections at your next event
      </Text>
      <View style={styles.avatarsRow}>
        {[require('../assets/images/imageB.jpg'), require('../assets/images/imageA.jpg'), require('../assets/images/imageC.jpg')].map((src, idx) => (
          <Image key={idx} source={src} style={styles.avatar} />
        ))}
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: isDark ? '#BB86FC' : '#6A0DAD' }]}>
        <Text style={styles.buttonText}>SyncUp - CNETWK Live</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  avatarsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  button: {
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ExploreConnectionsCard;
