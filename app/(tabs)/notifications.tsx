// This is the main screen for notifications

import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, Modal, View as RNView, Platform, Alert, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import NotificationsContentInfo, { Notification as NotificationType, mockNotifications } from '@/components/NotificationsContent';
import { View } from '@/components/Themed';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';

function getRelativeTimestamp(days: number, hours: number) {
  if (days === 0 && hours === 0) return 'Just now';
  if (days === 0) return `in ${hours} hour(s)`;
  if (hours === 0) return `in ${days} day(s)`;
  return `in ${days} day(s) and ${hours} hour(s)`;
}

export default function notificationsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [notifications, setNotifications] = useState<NotificationType[]>(mockNotifications);
  const [initialized, setInitialized] = useState(true); // No need for async init now
  const [reminderName, setReminderName] = useState('');
  const isDark = useColorScheme() === 'dark';
  const styles = getStyles(isDark);

  // Load initial notifications from mock on first mount
  useEffect(() => {
    // setNotifications([]); // Start with empty or static notifications if needed
    // setInitialized(true);
  }, [initialized]);

  useEffect(() => {
    // Request notification permissions on mount
    if (Platform.OS !== 'web') {
      Notifications.requestPermissionsAsync();
    }
  }, []);

  const handleSetTimer = async () => {
    setModalVisible(false);
    // Add new notification to the top
    const now = new Date();
    const fireDate = new Date(now.getTime() + days * 24 * 60 * 60 * 1000 + hours * 60 * 60 * 1000);
    const name = reminderName.trim() || 'Custom Reminder';
    const newNotification: NotificationType = {
      id: Math.random().toString(36).slice(2),
      type: 'reminder',
      title: `⏰ ${name}`,
      message: `You set a reminder for your notifications (${getRelativeTimestamp(days, hours)}).`,
      timestamp: now.toISOString(),
    };
    setNotifications(prev => [newNotification, ...prev]);
    setDays(0);
    setHours(0);
    setReminderName('');
    // Schedule local notification only on native platforms
    if (Platform.OS !== 'web') {
      const seconds = Math.max(1, Math.floor((fireDate.getTime() - Date.now()) / 1000));
      await Notifications.scheduleNotificationAsync({
        content: {
          title: `⏰ ${name}`,
          body: 'This is your reminder for your notifications!',
          sound: true,
        },
        trigger: { seconds, repeats: false } as any,
      });
    } else {
      Alert.alert('Not supported', 'Local notifications are not supported on web.');
    }
  };

  const increment = (type: 'days' | 'hours') => {
    if (type === 'days') setDays(d => d + 1);
    else setHours(h => (h < 23 ? h + 1 : 0));
  };
  const decrement = (type: 'days' | 'hours') => {
    if (type === 'days') setDays(d => (d > 0 ? d - 1 : 0));
    else setHours(h => (h > 0 ? h - 1 : 0));
  };

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#181828' : '#F6F0FF' }]}> // theme adaptive
      <NotificationsContentInfo
        notifications={notifications}
        setNotifications={setNotifications}
        onDeleteNotification={id => setNotifications(prev => prev.filter(n => n.id !== id))}
      />
      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
      {/* Timer Setter Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <RNView style={styles.modalOverlay}>
          <RNView style={styles.modalContent}>
            <Text style={{fontSize:18, fontWeight:'bold', marginBottom:12}}>Set Reminder Timer</Text>
            <TextInput
              style={styles.input}
              placeholder="Reminder Name"
              value={reminderName}
              onChangeText={setReminderName}
              maxLength={40}
              placeholderTextColor="#aaa"
            />
            <RNView style={styles.row}>
              <Text style={styles.label}>Days</Text>
              <TouchableOpacity style={styles.incDecButton} onPress={() => decrement('days')}><Text style={styles.incDecText}>-</Text></TouchableOpacity>
              <Text style={styles.value}>{days}</Text>
              <TouchableOpacity style={styles.incDecButton} onPress={() => increment('days')}><Text style={styles.incDecText}>+</Text></TouchableOpacity>
            </RNView>
            <RNView style={styles.row}>
              <Text style={styles.label}>Hours</Text>
              <TouchableOpacity style={styles.incDecButton} onPress={() => decrement('hours')}><Text style={styles.incDecText}>-</Text></TouchableOpacity>
              <Text style={styles.value}>{hours}</Text>
              <TouchableOpacity style={styles.incDecButton} onPress={() => increment('hours')}><Text style={styles.incDecText}>+</Text></TouchableOpacity>
            </RNView>
            <Text style={{marginVertical:16, fontSize:16, color:'#6D0080'}}>Remind me in {days} day(s) and {hours} hour(s)</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={handleSetTimer}>
              <Text style={{color:'#fff', fontWeight:'bold'}}>Set Timer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={{color:'#6D0080'}}>Cancel</Text>
            </TouchableOpacity>
          </RNView>
        </RNView>
      </Modal>
    </View>
  );
}

// Styles for the notifications screen
const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6D0080',
    marginTop: 32,
    marginBottom: 18,
    alignSelf: 'center',
    letterSpacing: 1.2,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#661875ff',
    borderRadius: 30, 
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: 300,
    alignItems: 'center',
  },
  pickerButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#6D0080',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    width: 60,
    textAlign: 'right',
    marginRight: 8,
  },
  incDecButton: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  incDecText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6D0080',
  },
  value: {
    fontSize: 18,
    width: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#f9f9f9',
  },
});
