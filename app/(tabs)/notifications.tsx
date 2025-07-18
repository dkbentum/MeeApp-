// This is the main screen for notifications

import { StyleSheet, Text } from 'react-native';

import NotificationsContentInfo from '@/components/NotificationsContent';
import { View } from '@/components/Themed';

export default function notificationsScreen() {
  return (
    <View style={styles.container}>
      <NotificationsContentInfo />
    </View>
  );
}

// Styles for the notifications screen
const styles = StyleSheet.create({
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
});
