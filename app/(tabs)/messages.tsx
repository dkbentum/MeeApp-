import { StyleSheet } from 'react-native';

import EmptyMessagesInfo from '@/components/EmptyMessages';
import { Text, View } from '@/components/Themed';

export default function messagesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>No messages at the moment</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EmptyMessagesInfo path="app/(tabs)/five.tsx" />
    </View>
  );
}

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
