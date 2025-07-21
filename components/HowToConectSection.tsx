import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

const steps = [
  'Join a CNET & WK session',
  'Open the app',
  'Choose CNETs up to 24 hours after the CNET & WK session',
];

const HowToConnectSection = () => {
  const isDark = useColorScheme() === 'dark';

  return (
    <View>
      <Text style={[styles.heading, { color: isDark ? '#fff' : '#000' }]}>
        How to make a connection
      </Text>
      {steps.map((step, idx) => (
        <View style={styles.stepRow} key={idx}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{idx + 1}</Text>
          </View>
          <Text style={[styles.stepText, { color: isDark ? '#CCC' : '#444' }]}>{step}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 16,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  circle: {
    backgroundColor: '#6A0DAD',
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  circleText: {
    color: 'white',
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 15,
    flexShrink: 1,
  },
});

export default HowToConnectSection;
