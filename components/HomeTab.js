// Tab.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const PURPLE = '#6A0DAD';
const LIGHT_PURPLE = '#F2E8FF';

const Tab = ({ label, active, badgeCount, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={[styles.tab, active && styles.activeTab]}>
      <Text style={[styles.tabText, active && styles.activeTabText]}>{label}</Text>
      {badgeCount ? (
        <View style={styles.badge}><Text style={styles.badgeText}>{badgeCount}</Text></View>
      ) : null}
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'spaced-between',
  },
  activeTab: {
    backgroundColor: LIGHT_PURPLE,
    borderWidth: 6,
    borderColor: PURPLE,
  },
  tabText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#444',
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
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default Tab;