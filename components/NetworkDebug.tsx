import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getApiUrl, getLocalhostUrl } from '@/constants/Config';
import { checkBackendHealth, getNetworkInfo } from '@/utils/networkUtils';
import { useColorScheme } from './useColorScheme';

export default function NetworkDebug() {
  const [isBackendHealthy, setIsBackendHealthy] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const checkBackend = async () => {
    setIsLoading(true);
    try {
      const healthy = await checkBackendHealth();
      setIsBackendHealthy(healthy);
      Alert.alert(
        'Backend Status',
        healthy ? '✅ Backend is reachable!' : '❌ Backend is not reachable',
        [{ text: 'OK' }]
      );
    } catch (error) {
      setIsBackendHealthy(false);
      Alert.alert('Error', 'Failed to check backend status');
    } finally {
      setIsLoading(false);
    }
  };

  const showNetworkInfo = () => {
    const info = getNetworkInfo();
    Alert.alert(
      'Network Info',
      `API Base URL: ${info.apiBaseUrl}\nPlatform: ${info.platform}\nDev Mode: ${info.isDev ? 'Yes' : 'No'}`,
      [{ text: 'OK' }]
    );
  };

  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Network Debug</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>API Base URL:</Text>
        <Text style={styles.value}>{getApiUrl('')}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Localhost URL:</Text>
        <Text style={styles.value}>{getLocalhostUrl()}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Backend Status:</Text>
        <Text style={[
          styles.value, 
          isBackendHealthy === true ? styles.success : 
          isBackendHealthy === false ? styles.error : 
          styles.neutral
        ]}>
          {isBackendHealthy === null ? 'Checking...' :
           isBackendHealthy ? '✅ Healthy' : '❌ Unreachable'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={checkBackend}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Checking...' : 'Check Backend'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.secondaryButton]} 
          onPress={showNetworkInfo}
        >
          <Text style={styles.buttonText}>Network Info</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tipsContainer}>
        <Text style={styles.tipsTitle}>Troubleshooting Tips:</Text>
        <Text style={styles.tip}>• Make sure your backend is running on port 8080</Text>
        <Text style={styles.tip}>• For Android emulator, use 10.0.2.2:8080</Text>
        <Text style={styles.tip}>• For iOS simulator, use localhost:8080</Text>
        <Text style={styles.tip}>• For physical device, use your computer's IP address</Text>
        <Text style={styles.tip}>• Check firewall settings</Text>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 20,
      textAlign: 'center',
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#2C2C2C' : '#E9ECEF',
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: isDark ? '#CCCCCC' : '#666666',
    },
    value: {
      fontSize: 14,
      color: isDark ? '#AAAAAA' : '#888888',
      flex: 1,
      textAlign: 'right',
      marginLeft: 10,
    },
    success: {
      color: '#4CAF50',
    },
    error: {
      color: '#F44336',
    },
    neutral: {
      color: isDark ? '#AAAAAA' : '#888888',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 20,
      marginBottom: 20,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      minWidth: 120,
      alignItems: 'center',
    },
    primaryButton: {
      backgroundColor: '#6A0DAD',
    },
    secondaryButton: {
      backgroundColor: isDark ? '#2C2C2C' : '#F1F3F4',
    },
    buttonText: {
      color: '#FFFFFF',
      fontWeight: '600',
      fontSize: 14,
    },
    tipsContainer: {
      marginTop: 20,
      padding: 15,
      backgroundColor: isDark ? '#2D1B69' : '#F0E6FF',
      borderRadius: 8,
    },
    tipsTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#6A0DAD',
      marginBottom: 10,
    },
    tip: {
      fontSize: 14,
      color: isDark ? '#CCCCCC' : '#666666',
      marginBottom: 5,
    },
  }); 