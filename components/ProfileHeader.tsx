import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from './useColorScheme';

const LIGHT_BG = '#fff';
const DARK_BG = '#23233a';
const LIGHT_CARD = '#F7F7FA';
const DARK_CARD = '#23233a';
const ACCENT = '#222';
const TEXT_LIGHT = '#111';
const TEXT_DARK = '#fff';
const BADGE_LIGHT = '#E5E5E5';
const BADGE_DARK = '#33343a';

interface ProfileHeaderProps {
  name: string;
  email: string;
  image: string | null;
  onEditAvatar: () => void;
  showName?: boolean;
  showEmail?: boolean;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ name, email, image, onEditAvatar, showName = true, showEmail = true }) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const styles = getStyles(isDark);

  return (
    <View style={styles.profileHeader}>
      <View style={styles.imageWrapper}>
        <Image
          source={image ? { uri: image } : require('../assets/images/p1.jpg')}
          style={styles.coverImage}
        />
        <TouchableOpacity style={styles.editAvatarFloating} onPress={onEditAvatar}>
          <Ionicons name="camera" size={22} color={isDark ? TEXT_DARK : ACCENT} />
        </TouchableOpacity>
      </View>
      {/* Name and email are now overlaid in parent, not here */}
      <View style={styles.geekBadge}>
        <MaterialCommunityIcons name="alien" size={16} color={isDark ? TEXT_DARK : ACCENT} />
        <Text style={styles.geekBadgeText}>Level 7 Coder</Text>
      </View>
    </View>
  );
};

const getStyles = (isDark: boolean) => StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: isDark ? DARK_CARD : LIGHT_CARD,
    borderRadius: 0,
    paddingVertical: 0,
    marginHorizontal: 0,
    shadowColor: isDark ? '#000' : '#bbb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 3,
    width: '100%',
  },
  imageWrapper: {
    width: '100%',
    aspectRatio: 1,
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  editAvatarFloating: {
    position: 'absolute',
    bottom: 18,
    right: 18,
    backgroundColor: isDark ? '#222' : '#fff',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: isDark ? TEXT_DARK : ACCENT,
    backgroundColor: isDark ? DARK_BG : LIGHT_BG,
    shadowColor: isDark ? '#000' : '#bbb',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: isDark ? TEXT_DARK : ACCENT,
    borderRadius: 16,
    padding: 6,
    borderWidth: 2,
    borderColor: isDark ? DARK_CARD : LIGHT_CARD,
  },
  name: {
    color: isDark ? TEXT_DARK : ACCENT,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 4,
  },
  email: {
    color: isDark ? '#bbb' : '#555',
    fontSize: 15,
    marginBottom: 6,
  },
  geekBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDark ? BADGE_DARK : BADGE_LIGHT,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 4,
    marginBottom: 8,
  },
  geekBadgeText: {
    color: isDark ? TEXT_DARK : ACCENT,
    fontSize: 13,
    marginLeft: 6,
    fontWeight: '600',
  },
});

export default ProfileHeader; 