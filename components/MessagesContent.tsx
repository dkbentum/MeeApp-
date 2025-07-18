import React, { useEffect, useState } from 'react';
import { 
  ActivityIndicator, 
  FlatList, 
  StyleSheet, 
  useColorScheme, 
  TouchableOpacity, 
  Alert,
  Animated,
  Dimensions
} from 'react-native';
import { Text, View } from './Themed';
import { Ionicons } from '@expo/vector-icons';
import { useArchive } from './ArchiveContext';
import { useAuth } from './AuthContext';
import { getApiUrl } from '@/constants/Config';

interface GroupMember {
  id: number;
  username: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member' | 'moderator';
}

interface Group {
  id: number;
  name: string;
  description: string;
  avatar: string;
  members: GroupMember[];
  memberCount: number;
  createdAt: string;
  lastActivity: string;
  isActive: boolean;
}

interface BackendMessage {
  id: number;
  content: string;
  sender: {
    id: number;
    username: string;
    email: string;
  };
  group: {
    id: number;
    name: string;
  };
  isRead: boolean;
  sentAt: string;
}

interface Message {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  avatar: string;
  isRead: boolean;
  type: 'received' | 'sent';
  groupId: number;
  groupName: string;
  groupAvatar: string;
  memberCount: number;
}

export default function MessagesContentInfo({ path, searchQuery }: { path: string; searchQuery?: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null);
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);
  const { archivePost } = useArchive();
  const { user, token } = useAuth();

  const fetchGroupMessages = async () => {
    try {
      if (!token || !user) {
        console.log('No auth token or user available');
        setLoading(false);
        return;
      }

      const response = await fetch(getApiUrl('/api/messages/groups'), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const groupMessages: BackendMessage[] = await response.json();
      
      // Convert backend messages to our format
      const convertedMessages = groupMessages.map(msg => {
        const isSentByCurrentUser = msg.sender.id === user.id;
        
        return {
          id: msg.id,
          sender: msg.sender.username,
          content: msg.content,
          timestamp: formatTimestamp(msg.sentAt),
          avatar: getAvatarForUser(msg.sender.username),
          isRead: msg.isRead,
          type: isSentByCurrentUser ? 'sent' : 'received',
          groupId: msg.group.id,
          groupName: msg.group.name,
          groupAvatar: getGroupAvatar(msg.group.name),
          memberCount: getGroupMemberCount(msg.group.id),
        } as Message;
      });

      // Sort messages by timestamp (newest first)
      convertedMessages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      
      setMessages(convertedMessages);
    } catch (error) {
      console.error('Failed to fetch group messages:', error);
      // Fallback to mock data if API fails
      setMessages(getMockGroupMessages());
    } finally {
      setLoading(false);
    }
  };

  const getMockGroupMessages = (): Message[] => [
    {
      id: 1,
      sender: "Sarah Johnson",
      content: "Hey everyone! Are you still interested in joining our coding meetup this weekend?",
      timestamp: "2 min ago",
      avatar: "👩‍💻",
      isRead: false,
      type: 'received',
      groupId: 1,
      groupName: "React Devs",
      groupAvatar: "⚛️",
      memberCount: 12
    },
    {
      id: 2,
      sender: "Mike Chen",
      content: "Thanks for the connection request! I'd love to collaborate on that project.",
      timestamp: "5 min ago",
      avatar: "👨‍💼",
      isRead: true,
      type: 'received',
      groupId: 2,
      groupName: "Startup Founders",
      groupAvatar: "🚀",
      memberCount: 8
    },
    {
      id: 3,
      sender: "You",
      content: "Absolutely! I'm really excited about the opportunity to work together.",
      timestamp: "8 min ago",
      avatar: "😊",
      isRead: true,
      type: 'sent',
      groupId: 2,
      groupName: "Startup Founders",
      groupAvatar: "🚀",
      memberCount: 8
    },
    {
      id: 4,
      sender: "Emma Davis",
      content: "The event details have been updated. Check out the new schedule!",
      timestamp: "12 min ago",
      avatar: "👩‍🎨",
      isRead: false,
      type: 'received',
      groupId: 3,
      groupName: "Design Masters",
      groupAvatar: "🎨",
      memberCount: 15
    },
    {
      id: 5,
      sender: "Alex Rodriguez",
      content: "Great meeting you at the conference yesterday. Let's stay in touch!",
      timestamp: "1 hour ago",
      avatar: "👨‍🔬",
      isRead: true,
      type: 'received',
      groupId: 4,
      groupName: "AI Researchers",
      groupAvatar: "🤖",
      memberCount: 23
    },
    {
      id: 6,
      sender: "You",
      content: "Likewise! I'll send you those resources we discussed.",
      timestamp: "1 hour ago",
      avatar: "😊",
      isRead: true,
      type: 'sent',
      groupId: 4,
      groupName: "AI Researchers",
      groupAvatar: "🤖",
      memberCount: 23
    },
    {
      id: 7,
      sender: "Priya Patel",
      content: "Don't forget our group call at 3pm!",
      timestamp: "2 hours ago",
      avatar: "👩🏽‍💼",
      isRead: false,
      type: 'received',
      groupId: 5,
      groupName: "Product Managers",
      groupAvatar: "📊",
      memberCount: 18
    },
    {
      id: 8,
      sender: "You",
      content: "I'll be there! Looking forward to it.",
      timestamp: "2 hours ago",
      avatar: "😊",
      isRead: true,
      type: 'sent',
      groupId: 5,
      groupName: "Product Managers",
      groupAvatar: "📊",
      memberCount: 18
    },
    {
      id: 9,
      sender: "Liam Smith",
      content: "Can you review my PR when you get a chance?",
      timestamp: "3 hours ago",
      avatar: "👨‍💻",
      isRead: false,
      type: 'received',
      groupId: 6,
      groupName: "Backend Engineers",
      groupAvatar: "⚙️",
      memberCount: 9
    },
    {
      id: 10,
      sender: "You",
      content: "Sure thing! I'll check it out this afternoon.",
      timestamp: "3 hours ago",
      avatar: "😊",
      isRead: true,
      type: 'sent',
      groupId: 6,
      groupName: "Backend Engineers",
      groupAvatar: "⚙️",
      memberCount: 9
    },
    {
      id: 11,
      sender: "Nina Müller",
      content: "Happy Friday! Any plans for the weekend?",
      timestamp: "4 hours ago",
      avatar: "👩‍🔬",
      isRead: false,
      type: 'received',
      groupId: 7,
      groupName: "Data Scientists",
      groupAvatar: "📈",
      memberCount: 14
    },
    {
      id: 12,
      sender: "You",
      content: "Not yet! Maybe a hike if the weather is good.",
      timestamp: "4 hours ago",
      avatar: "😊",
      isRead: true,
      type: 'sent',
      groupId: 7,
      groupName: "Data Scientists",
      groupAvatar: "📈",
      memberCount: 14
    },
    {
      id: 13,
      sender: "Carlos Silva",
      content: "The CNETWK event was awesome! Thanks for the invite.",
      timestamp: "5 hours ago",
      avatar: "👨🏽‍💼",
      isRead: true,
      type: 'received',
      groupId: 8,
      groupName: "Tech Entrepreneurs",
      groupAvatar: "💼",
      memberCount: 31
    },
    {
      id: 14,
      sender: "You",
      content: "Glad you enjoyed it! Let's catch up soon.",
      timestamp: "5 hours ago",
      avatar: "😊",
      isRead: true,
      type: 'sent',
      groupId: 8,
      groupName: "Tech Entrepreneurs",
      groupAvatar: "💼",
      memberCount: 31
    },
  ];

  const formatTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hour${Math.floor(diffInMinutes / 60) > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInMinutes / 1440)} day${Math.floor(diffInMinutes / 1440) > 1 ? 's' : ''} ago`;
  };

  const getAvatarForUser = (username: string): string => {
    // Simple avatar mapping based on username
    const avatars = ['👩‍💻', '👨‍💼', '👩‍🎨', '👨‍🔬', '👨‍🏫', '👩‍⚕️', '👨‍💻', '👩‍🏫'];
    const index = username.length % avatars.length;
    return avatars[index];
  };

  const getGroupAvatar = (groupName: string): string => {
    // Geeky group avatars based on group name
    const groupAvatars: { [key: string]: string } = {
      'React Devs': '⚛️',
      'Startup Founders': '🚀',
      'Design Masters': '🎨',
      'AI Researchers': '🤖',
      'Product Managers': '📊',
      'Backend Engineers': '⚙️',
      'Data Scientists': '📈',
      'Tech Entrepreneurs': '💼',
      'Mobile Devs': '📱',
      'Web Developers': '🌐',
      'DevOps Engineers': '🐳',
      'UI/UX Designers': '🎭',
      'Game Developers': '🎮',
      'Cybersecurity': '🔒',
      'Blockchain Devs': '⛓️',
      'Cloud Engineers': '☁️',
      'Machine Learning': '🧠',
      'Frontend Masters': '🎯',
      'Full Stack Devs': '🔄',
      'Open Source': '❤️',
    };
    
    return groupAvatars[groupName] || '👥';
  };

  const getGroupMemberCount = (groupId: number): number => {
    // Mock member counts for different groups
    const memberCounts: { [key: number]: number } = {
      1: 12, // React Devs
      2: 8,  // Startup Founders
      3: 15, // Design Masters
      4: 23, // AI Researchers
      5: 18, // Product Managers
      6: 9,  // Backend Engineers
      7: 14, // Data Scientists
      8: 31, // Tech Entrepreneurs
    };
    
    return memberCounts[groupId] || Math.floor(Math.random() * 20) + 5;
  };

  const markMessageAsRead = async (messageId: number) => {
    try {
      if (!token) return;

      await fetch(getApiUrl(`/api/messages/${messageId}/read`), {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  useEffect(() => {
    if (user && token) {
      fetchGroupMessages();
    } else {
      // Use mock data if no auth
      setMessages(getMockGroupMessages());
      setLoading(false);
    }
  }, [user, token]);

  const handleDelete = (messageId: number) => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            setMessages(prev => prev.filter(msg => msg.id !== messageId));
            setSelectedMessage(null);
          }
        }
      ]
    );
  };

  const handleArchive = (message: Message) => {
    archivePost({
      id: message.id,
      title: `${message.groupName} - ${message.sender}`,
      body: message.content,
      message: null
    });
    setMessages(prev => prev.filter(msg => msg.id !== message.id));
    setSelectedMessage(null);
  };

  const handleMessagePress = (message: Message) => {
    setSelectedMessage(selectedMessage === message.id ? null : message.id);
    
    // Mark message as read if it's unread and received
    if (!message.isRead && message.type === 'received') {
      markMessageAsRead(message.id);
      // Update local state
      setMessages(prev => prev.map(msg => 
        msg.id === message.id ? { ...msg, isRead: true } : msg
      ));
    }
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <TouchableOpacity 
      style={[
        styles.messageContainer,
        item.type === 'sent' && styles.sentMessage,
        selectedMessage === item.id && styles.selectedMessage
      ]}
      onPress={() => handleMessagePress(item)}
      activeOpacity={0.8}
    >
      <View style={styles.messageHeader}>
        <View style={styles.groupInfo}>
          <Text style={styles.groupAvatar}>{item.groupAvatar}</Text>
          <View style={styles.groupDetails}>
            <Text style={styles.groupName}>{item.groupName}</Text>
            <Text style={styles.memberCount}>{item.memberCount} members</Text>
          </View>
        </View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
        {!item.isRead && item.type === 'received' && (
          <View style={styles.unreadIndicator} />
        )}
      </View>
      
      <View style={styles.messageContent}>
        <View style={styles.senderInfo}>
          <Text style={styles.senderAvatar}>{item.avatar}</Text>
          <Text style={styles.senderName}>{item.sender}</Text>
        </View>
        <Text style={styles.messageText}>{item.content}</Text>
      </View>
      
      {selectedMessage === item.id && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.archiveButton]}
            onPress={() => handleArchive(item)}
          >
            <Ionicons name="archive-outline" size={16} color="#6A0DAD" />
            <Text style={styles.actionButtonText}>Archive</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash-outline" size={16} color="#FF3B30" />
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );

  // Filter messages based on search query
  const filteredMessages = searchQuery 
    ? messages.filter(msg => 
        msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        msg.groupName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : messages;

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={isDark ? '#BB86FC' : '#6A0DAD'} />
          <Text style={styles.loadingText}>Loading group messages...</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.messageCount}>
              {filteredMessages.length} of {messages.length} group conversations
            </Text>
          </View>
          
          {filteredMessages.length === 0 && searchQuery ? (
            <View style={styles.emptySearch}>
              <Ionicons 
                name="search-outline" 
                size={48} 
                color={isDark ? '#BB86FC' : '#6A0DAD'} 
              />
              <Text style={styles.emptySearchTitle}>No group messages found</Text>
              <Text style={styles.emptySearchSubtitle}>
                Try adjusting your search terms
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredMessages}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderMessage}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          )}
        </>
      )}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#121212' : '#F8F9FA',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loadingText: {
      marginTop: 10,
      fontSize: 16,
      color: isDark ? '#BB86FC' : '#6A0DAD',
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
    listContent: {
      paddingHorizontal: 20,
      paddingVertical: 10,
    },
    separator: {
      height: 1,
      backgroundColor: isDark ? '#2C2C2C' : '#E9ECEF',
      marginVertical: 8,
    },
    messageContainer: {
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
    sentMessage: {
      backgroundColor: isDark ? '#2D1B69' : '#E8F5E8',
      borderColor: isDark ? '#4A2B8A' : '#D4EDDA',
    },
    selectedMessage: {
      borderColor: isDark ? '#BB86FC' : '#6A0DAD',
      borderWidth: 2,
    },
    messageHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 12,
      justifyContent: 'space-between',
    },
    groupInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    groupAvatar: {
      fontSize: 28,
      marginRight: 12,
    },
    groupDetails: {
      flex: 1,
    },
    groupName: {
      fontSize: 16,
      fontWeight: '700',
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      marginBottom: 2,
    },
    memberCount: {
      fontSize: 12,
      color: isDark ? '#AAAAAA' : '#6C757D',
    },
    timestamp: {
      fontSize: 12,
      color: isDark ? '#AAAAAA' : '#6C757D',
    },
    unreadIndicator: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#FF3B30',
      marginLeft: 8,
    },
    messageContent: {
      marginTop: 8,
    },
    senderInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    senderAvatar: {
      fontSize: 20,
      marginRight: 8,
    },
    senderName: {
      fontSize: 14,
      fontWeight: '600',
      color: isDark ? '#E0E0E0' : '#2C3E50',
    },
    messageText: {
      fontSize: 15,
      lineHeight: 20,
      color: isDark ? '#E0E0E0' : '#2C3E50',
      marginLeft: 28,
    },
    actionButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 12,
      gap: 12,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 8,
      gap: 4,
    },
    archiveButton: {
      backgroundColor: isDark ? '#2D1B69' : '#F0E6FF',
    },
    deleteButton: {
      backgroundColor: isDark ? '#4A1A1A' : '#FFEBEE',
    },
    actionButtonText: {
      fontSize: 12,
      fontWeight: '500',
      color: '#6A0DAD',
    },
    deleteButtonText: {
      color: '#FF3B30',
    },
    emptySearch: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 40,
    },
    emptySearchTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      marginTop: 16,
      marginBottom: 8,
    },
    emptySearchSubtitle: {
      fontSize: 14,
      color: isDark ? '#AAAAAA' : '#6C757D',
      textAlign: 'center',
    },
  });
