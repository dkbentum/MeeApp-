import React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme } from 'react-native';

const NoConnectionsIllustration = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/tennis_girl.jpg')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={[styles.text, { color: isDark ? '#CCC' : '#333' }]}>
        You don’t have any connections yet
      </Text>
      <Text style={[styles.subText, { color: isDark ? '#888' : '#666' }]}>
        After connections are made they will appear here
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 250,
    height: 150,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  subText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default NoConnectionsIllustration;
