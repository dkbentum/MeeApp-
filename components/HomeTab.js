import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native';

const PURPLE = '#6A0DAD';
const LIGHT_PURPLE = '#F2E8FF';
const DARK_BG = '#1E1E1E';
const DARK_TAB = '#2E2E2E';

const Tab = ({ label, active, badgeCount, onPress }) => {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.tab, active && styles.activeTab]}>
        <Text style={[styles.tabText, active && styles.activeTabText]}>{label}</Text>
        {badgeCount ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badgeCount}</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const getStyles = (isDark) =>
  StyleSheet.create({
    tab: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 25,
      backgroundColor: isDark ? DARK_TAB : '#eee',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    activeTab: {
      backgroundColor: isDark ? '#3A2D53' : LIGHT_PURPLE,
      borderWidth: 6,
      borderColor: PURPLE,
    },
    tabText: {
      fontWeight: '700',
      fontSize: 15,
      color: isDark ? '#ccc' : '#444',
    },
    activeTabText: {
      color: PURPLE,
    },
    badge: {
      backgroundColor: PURPLE,
      borderRadius: 16,
      paddingHorizontal: 8,
      paddingVertical: 3,
      marginLeft: 8,
    },
    badgeText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'bold',
    },
  });

export default Tab;
