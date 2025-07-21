import MessagesContentInfo from '@/components/MessagesContent';
import { View, Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import { useColorScheme } from '@/components/useColorScheme';

export default function MessagesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#181828' : '#F6F0FF' }]}>
      {/* Search Header */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons 
            name="search" 
            size={20} 
            color={isDark ? '#AAAAAA' : '#6C757D'} 
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search messages..."
            placeholderTextColor={isDark ? '#AAAAAA' : '#6C757D'}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity 
              onPress={() => setSearchQuery('')}
              style={styles.clearButton}
            >
              <Ionicons 
                name="close-circle" 
                size={20} 
                color={isDark ? '#AAAAAA' : '#6C757D'} 
              />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Lower header */}
      <Text style={styles.lowerHeader}>Group messages</Text>

      <MessagesContentInfo path="app/(tabs)/messages.tsx" searchQuery={searchQuery} />

      {/* Floating Add Button */}
      {/* Removed the floating + button as requested */}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#F8F9FA',
    },
    searchContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#2C2C2C' : '#E9ECEF',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: isDark ? '#2C2C2C' : '#E9ECEF',
    },
    searchIcon: {
      marginRight: 8,
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      paddingVertical: 4,
    },
    clearButton: {
      padding: 4,
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
    lowerHeader: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#6D0080',
      marginTop: 8,
      marginBottom: 8,
      marginLeft: 20,
    },
  });
