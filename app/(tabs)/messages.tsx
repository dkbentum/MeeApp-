import MessagesContentInfo from '@/components/MessagesContent';
import { View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function MessagesScreen() {
  return (
    <View style={styles.container}>
      <MessagesContentInfo path="app/(tabs)/five.tsx" />

      {/* Floating Add Button */}
      <TouchableOpacity style={styles.fab} onPress={() => console.log('Add Message')}>
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Changed from center to allow top-aligned content
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
    elevation: 5, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
  },
});
