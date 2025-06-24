import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const ExploreHeader = () => {
  const timeTabs = ['Upcoming', 'Today', 'Tomorrow', 'Weekend'];
  const categoryTabs = ['All Events', 'New groups', 'Social Activities', 'Hobbies'];
  return (
    <View style={styles.container}>
      {/* 🔍 Search bar + Filter */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Explore events near you"
          placeholderTextColor="#888"
          style={styles.input}
        />
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      {/* 🟦 Time Tabs */}
      <View style={styles.timeTabs}>
        {timeTabs.map((label, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.tabButton,
              label === 'Upcoming' && styles.activeTab,
            ]}
          >
            <Text style={styles.tabText}>{label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 🧃 Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryTabs}
      >
        {categoryTabs.map((cat, idx) => (
          <TouchableOpacity key={idx} style={styles.categoryButton}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
  },
  filterButton: {
    marginLeft: 10,
  },
  timeTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#1c1c1c',
  },
  activeTab: {
    backgroundColor: '#008080', // Teal-ish
  },
  tabText: {
    color: '#fff',
    fontWeight: '600',
  },
  categoryTabs: {
    marginTop: 16,
  },
  categoryButton: {
    marginRight: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    paddingBottom: 6,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default ExploreHeader;
// This component can be imported and used in your Explore screen or wherever needed.

// Usage example in Explore screen:
// import ExploreHeader from './exploreHeader';
// ...
// <ScrollView>
//   <ExploreHeader />
//   {/* Other components */}
// </ScrollView>

// Note: Make sure to adjust the import path based on your project structure.   