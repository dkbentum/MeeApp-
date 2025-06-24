import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const timeTabs = ['Upcoming', 'Today', 'Tomorrow', 'Weekend'];

const categoryTabs = [
{ name: 'All Events', icon: 'calendar-outline' },
{ name: 'New Groups', icon: 'people-outline' },
{ name: 'Social', icon: 'balloon-outline' },
{ name: 'Hobbies', icon: 'color-palette-outline' },
{ name: 'Workshops', icon: 'construct-outline' },
{ name: 'Tech Talks', icon: 'laptop-outline' },
{ name: 'Games', icon: 'calendar-outline' },
{ name: 'Music', icon: 'people-outline' },
{ name: 'Arts', icon: 'balloon-outline' },
{ name: 'Education', icon: 'color-palette-outline' },
{ name: 'Writing', icon: 'construct-outline' },
{ name: 'Career $ Business', icon: 'laptop-outline' },
];

export default function ExploreTopSection() {
const [selectedTimeTab, setSelectedTimeTab] = useState('Upcoming');
const [selectedCategory, setSelectedCategory] = useState('All Events');

return (
    <View style={styles.container}>
      {/* 🔍 Search bar */}
    <View style={styles.searchContainer}>
        <TextInput
        placeholder="Explore events near you"
        placeholderTextColor="#888"
        style={styles.input}
        />
        <TouchableOpacity style={styles.filterButton}>
        <Entypo name="dropbox" size={25} color="white" />
        </TouchableOpacity>
    </View>

      {/* 🕒 Time Tabs */}
      <View style={styles.timeTabs}>
        {timeTabs.map((label, index) => {
          const isSelected = selectedTimeTab === label;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.timeTabButton, isSelected && styles.activeTimeTab]}
              onPress={() => setSelectedTimeTab(label)}
            >
              <Text
                style={[
                  styles.timeTabText,
                  isSelected && styles.activeTimeTabText,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* 🎨 Category Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryScroll}
      >
        {categoryTabs.map((tab, index) => {
          const isSelected = selectedCategory === tab.name;
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.categoryButton,
                isSelected && styles.selectedCategoryButton,
              ]}
              onPress={() => setSelectedCategory(tab.name)}
            >
              <Ionicons
                name={tab.icon}
                size={25}
                color={isSelected ? '#000' : '#ccc'}
              />
              <Text
                style={[
                  styles.categoryText,
                  isSelected && styles.selectedCategoryText,
                ]}
              >
                {tab.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    paddingTop: 45,
    paddingBottom: 2,
    paddingHorizontal: 15,
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
    marginTop: 8,
  },
  timeTabButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#1c1c1c',
  },
  activeTimeTab: {
    backgroundColor: '#008080',
  },
  timeTabText: {
    color: '#ccc',
    fontWeight: '600',
  },
  activeTimeTabText: {
    color: '#fff',
  },
  categoryScroll: {
    marginTop: 10,
    paddingBottom: 5,
  },
  categoryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    backgroundColor: '#1c1c1c',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 14,
    width: 80,
  },
  selectedCategoryButton: {
    backgroundColor: '#fff',
  },
  categoryText: {
    marginTop: 6,
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
  selectedCategoryText: {
    color: '#000',
    fontWeight: '600',
  },
});
