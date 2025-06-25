// This is the main screen for notifications

import { StyleSheet } from 'react-native';

import NotificationsContentInfo from '@/components/NotificationsContent';
import { Text, View } from '@/components/Themed';

export default function notificationsScreen() {
  return (
    <View style={styles.container}>
      //we can add some nice icons here to make it lool better
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <NotificationsContentInfo path="app/(tabs)/four.tsx" />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
