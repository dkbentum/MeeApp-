import React from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const QRConnectButton = ({ onPress }: { onPress?: () => void }) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: isDark ? '#292929' : '#EDE7F6' }]}
      onPress={onPress}
    >
      <MaterialCommunityIcons name="qrcode-scan" size={22} color="#6A0DAD" />
      <Text style={[styles.text, { color: '#6A0DAD' }]}>Scan to Connect</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    alignSelf: 'center',
    marginBottom: 24,
  },
  text: {
    fontWeight: '700',
    fontSize: 16,
  },
});

export default QRConnectButton;
