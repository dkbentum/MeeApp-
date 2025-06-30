import { StyleSheet } from 'react-native';

import ConnectionsContentInfo from '@/components/ConnectionsContent';
import { View } from '@/components/Themed';

export default function connectionsScreen() {
  return (
    <View style={styles.container}>
      <ConnectionsContentInfo path="app/(tabs)/EditScreenInfo.tsx" />
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
