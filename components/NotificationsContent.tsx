import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, ActivityIndicator, useColorScheme, Pressable, Alert } from 'react-native';
import { Text } from './Themed';
import { useRouter } from 'expo-router';

// Notification types: 'interest', 'system', 'general', 'group_message', 'group_invite', 'group_event', 'like'
type Notification = {
  id: string;
  type: 'interest' | 'system' | 'general' | 'group_message' | 'group_invite' | 'group_event' | 'like' | 'group_activity';
  title: string;
  message: string;
  timestamp: string;
  groupName?: string;
  groupId?: number;
  avatarUrl?: string; // for future use
};

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'interest',
    title: 'New Post in Your Interests',
    message: 'A new post about React Native was tagged with your interests.',
    timestamp: 'Just now',
  },
  {
    id: '2',
    type: 'system',
    title: 'Welcome to CNETWK!',
    message: 'Thanks for joining. Explore and connect with others!',
    timestamp: '5 min ago',
  },
  {
    id: '3',
    type: 'general',
    title: 'New Connection Request',
    message: 'Alex sent you a connection request.',
    timestamp: '10 min ago',
  },
  {
    id: '4',
    type: 'interest',
    title: 'Event Recommendation',
    message: 'Check out the upcoming Meetup for your interests.',
    timestamp: '1 hr ago',
  },
  {
    id: '5',
    type: 'system',
    title: 'App Update',
    message: 'CNETWK has new features. Update now for the best experience.',
    timestamp: '2 hrs ago',
  },
  {
    id: '6',
    type: 'group_message',
    title: 'New Message in React Devs',
    message: 'Sarah: "Hey everyone! Are you still interested in joining our coding meetup this weekend?"',
    timestamp: '2 hrs ago',
    groupName: 'React Devs',
    groupId: 1,
  },
  {
    id: '7',
    type: 'group_invite',
    title: 'Group Invite: AI Researchers',
    message: 'You have been invited to join "AI Researchers" group.',
    timestamp: '3 hrs ago',
    groupName: 'AI Researchers',
    groupId: 4,
  },
  {
    id: '8',
    type: 'group_event',
    title: 'Event Reminder: Tech Networking',
    message: 'Don\'t forget the "Tech Networking" event tomorrow at 6pm.',
    timestamp: '5 hrs ago',
    groupName: 'Tech Entrepreneurs',
    groupId: 8,
  },
  {
    id: '9',
    type: 'like',
    title: 'Post Liked',
    message: 'Taylor liked your post on "Expo Tips".',
    timestamp: '6 hrs ago',
  },
  {
    id: '10',
    type: 'group_message',
    title: 'New Message in Startup Founders',
    message: 'Mike: "Thanks for the connection request! I\'d love to collaborate on that project."',
    timestamp: '7 hrs ago',
    groupName: 'Startup Founders',
    groupId: 2,
  },
  {
    id: '11',
    type: 'group_activity',
    title: 'New Member in Design Masters',
    message: 'Emma Davis joined the "Design Masters" group.',
    timestamp: '8 hrs ago',
    groupName: 'Design Masters',
    groupId: 3,
  },
  {
    id: '12',
    type: 'group_message',
    title: 'New Message in Backend Engineers',
    message: 'Liam: "Can you review my PR when you get a chance?"',
    timestamp: '9 hrs ago',
    groupName: 'Backend Engineers',
    groupId: 6,
  },
  {
    id: '13',
    type: 'group_invite',
    title: 'Group Invite: Data Scientists',
    message: 'You have been invited to join "Data Scientists" group.',
    timestamp: '10 hrs ago',
    groupName: 'Data Scientists',
    groupId: 7,
  },
  {
    id: '14',
    type: 'group_activity',
    title: 'Event Created in Product Managers',
    message: 'Priya created a new event "Product Strategy Workshop" in "Product Managers" group.',
    timestamp: '12 hrs ago',
    groupName: 'Product Managers',
    groupId: 5,
  },
];

export default function NotificationsContentInfo() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);
  const router = useRouter();

  useEffect(() => {
    // Simulate fetch
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 600);
  }, []);

  const getTypeColor = (type: Notification['type']) => {
    switch (type) {
      case 'interest':
        return '#6D0080'; // CNETWK brand color
      case 'system':
        return isDark ? '#BB86FC' : '#4B0082';
      case 'group_message':
        return isDark ? '#00BFAE' : '#009688';
      case 'group_invite':
        return isDark ? '#FFD166' : '#FFB300';
      case 'group_event':
        return isDark ? '#FF6F61' : '#D7263D';
      case 'group_activity':
        return isDark ? '#4ECDC4' : '#26A69A';
      case 'like':
        return isDark ? '#FF80AB' : '#E91E63';
      default:
        return isDark ? '#CCCCCC' : '#888';
    }
  };

  const handlePress = (item: Notification) => {
    switch (item.type) {
      case 'group_invite':
      case 'group_activity':
        // Navigate to connections tab (no groups tab, so use connections)
        router.push('/(tabs)/connections');
        break;
      case 'group_event':
        // Navigate to explore tab (no events tab, so use explore)
        router.push('/(tabs)/explore');
        break;
      case 'group_message':
        // Navigate to messages tab
        router.push('/(tabs)/messages');
        break;
      case 'interest':
      case 'like':
        // Navigate to explore tab (posts)
        router.push('/(tabs)/explore');
        break;
      case 'system':
      case 'general':
      default:
        // For now, show an alert
        Alert.alert(item.title, item.message);
        break;
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable onPress={() => handlePress(item)} style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
      <Text style={[styles.title, { color: getTypeColor(item.type) }]}>{item.title}</Text>
      <Text style={styles.message}>{item.message}</Text>
      {item.groupName && (
        <Text style={styles.groupName}>📱 {item.groupName}</Text>
      )}
      <Text style={styles.timestamp}>{item.timestamp}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={getTypeColor('interest')} />
      ) : notifications.length === 0 ? (
        <Text style={styles.empty}>No notifications yet.</Text>
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1A1333' : '#F6F0FF',
      paddingHorizontal: 18,
      paddingTop: 18,
    },
    list: {
      paddingBottom: 30,
    },
    card: {
      backgroundColor: isDark ? '#23203a' : '#fff',
      borderRadius: 16,
      padding: 18,
      marginBottom: 14,
      shadowColor: isDark ? '#000' : '#aaa',
      shadowOpacity: 0.10,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 8,
      elevation: 2,
    },
    cardPressed: {
      opacity: 0.7,
    },
    title: {
      fontSize: 17,
      fontWeight: '700',
      marginBottom: 2,
    },
    message: {
      fontSize: 15,
      color: isDark ? '#E0E0E0' : '#444',
      marginBottom: 8,
    },
    groupName: {
      fontSize: 13,
      color: isDark ? '#BB86FC' : '#6A0DAD',
      fontWeight: '600',
      marginBottom: 8,
    },
    timestamp: {
      fontSize: 13,
      color: isDark ? '#AAAAAA' : '#888',
      textAlign: 'right',
    },
    empty: {
      fontSize: 16,
      color: '#888',
      marginTop: 40,
      alignSelf: 'center',
    },
  });
