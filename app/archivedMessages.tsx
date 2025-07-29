// app/modal.tsx
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useArchive } from '@/components/ArchiveContext';
import { useColorScheme } from '@/components/useColorScheme';

export default function ArchivedMessagesScreen() {
  const { archivedMessages, removeFromArchive } = useArchive();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  const handleDelete = (postId: number) => {
    Alert.alert(
      "Delete Archived Message",
      "Are you sure you want to permanently delete this message?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            removeFromArchive(postId);
          }
        }
      ]
    );
  };

  const renderArchivedMessage = ({ item }: { item: any }) => (
    <View style={styles.messageCard}>
      <View style={styles.messageHeader}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>📧</Text>
        </View>
        <View style={styles.messageInfo}>
          <Text style={styles.senderName}>{item.title}</Text>
          <Text style={styles.archiveDate}>Archived recently</Text>
        </View>
        <TouchableOpacity 
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      
      <Text style={styles.messageContent}>{item.body}</Text>
      
      <View style={styles.messageFooter}>
        <Ionicons name="archive" size={16} color="#6A0DAD" />
        <Text style={styles.archivedLabel}>Archived</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ 
        title: 'Archived Messages',
        headerStyle: {
          backgroundColor: isDark ? '#121212' : '#F8F9FA',
        },
        headerTintColor: isDark ? '#FFFFFF' : '#1A1A1A',
      }} />

      {archivedMessages.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons 
            name="archive-outline" 
            size={64} 
            color={isDark ? '#BB86FC' : '#6A0DAD'} 
          />
          <Text style={styles.emptyTitle}>No Archived Messages</Text>
          <Text style={styles.emptySubtitle}>
            Messages you archive will appear here for safekeeping.
          </Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Archived Messages</Text>
            <Text style={styles.messageCount}>{archivedMessages.length} archived</Text>
          </View>
          
          <FlatList
            data={archivedMessages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderArchivedMessage}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </>
      )}

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#F8F9FA',
    },
    header: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#2C2C2C' : '#E9ECEF',
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: '700',
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 4,
    },
    messageCount: {
      fontSize: 14,
      color: isDark ? '#AAAAAA' : '#6C757D',
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptyTitle: {
      fontSize: 20,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      marginTop: 16,
      marginBottom: 8,
    },
    emptySubtitle: {
      fontSize: 16,
      color: isDark ? '#AAAAAA' : '#6C757D',
      textAlign: 'center',
      lineHeight: 22,
    },
    listContent: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    separator: {
      height: 1,
      backgroundColor: isDark ? '#2C2C2C' : '#E9ECEF',
      marginVertical: 8,
    },
    messageCard: {
      backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
      borderRadius: 16,
      padding: 16,
      marginBottom: 8,
      shadowColor: isDark ? '#000' : '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 3,
      borderWidth: 1,
      borderColor: isDark ? '#2C2C2C' : '#F1F3F4',
    },
    messageHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
    },
    avatarContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: isDark ? '#2D1B69' : '#F0E6FF',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 12,
    },
    avatar: {
      fontSize: 20,
    },
    messageInfo: {
      flex: 1,
    },
    senderName: {
      fontSize: 16,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 2,
    },
    archiveDate: {
      fontSize: 12,
      color: isDark ? '#AAAAAA' : '#6C757D',
    },
    deleteButton: {
      padding: 8,
    },
    messageContent: {
      fontSize: 15,
      lineHeight: 20,
      color: isDark ? '#E0E0E0' : '#2C3E50',
      marginBottom: 12,
    },
    messageFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    archivedLabel: {
      fontSize: 12,
      color: '#6A0DAD',
      fontWeight: '500',
    },
  });
