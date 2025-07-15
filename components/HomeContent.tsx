/*
Goal: Split the current UI into clearly separated components so it's modular and clean. 
We'll break this monolith into:
- HomeContentInfo (View container)
- Tab (already a component)
- SuggestionCard
- GroupSection
- InterestsSection
- FeaturedSection
- RecommendedTopicsSection
- ConnectButton
*/

// 1. HomeContentInfo.js - the main screen wrapper
// 2. components/Tab.js
// 3. components/SuggestionCard.js
// 4. components/GroupSection.js
// 5. components/InterestsSection.js
// 6. components/FeaturedSection.js
// 7. components/RecommendedTopics.js
// 8. components/ConnectButton.js

// -- We'll mock a refactor plan (you can implement each component in separate files if needed) --

// HomeContentInfo.js
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ConnectButton from '../components/HomeConnectButton';
import FeaturedSection from '../components/HomeFeaturedSection';
import GroupSection from '../components/HomeGroupSection';
import InterestsSection from '../components/HomeInterestsSection';
import RecommendedTopics from '../components/HomeRecommendedTopics';
import SuggestionCard from '../components/HomeSuggestionCard';
import Tab from '../components/HomeTab';

const INTERESTS = [
  'AI', 'Fitness', 'Startups', 'Music', 'Gaming', 'Tech Talks',
  'Design', 'Photography', 'Spirituality', 'Health', 'Entrepreneurship', 'Networking'
];

const RECOMMENDED_TOPICS = ['AI Events', 'UX Meetups', 'Weekend Hackathons', 'Remote Jobs', 'Local Workshops'];

export default function HomeContentInfo() {
  const [selectedTab, setSelectedTab] = useState('Suggested');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Work Events Ahead</Text>

      <View style={styles.tabRow}>
        <Tab label="Going" active={selectedTab === 'Going'} badgeCount={0} onPress={() => setSelectedTab('Going')} />
        <Tab label="Saved" active={selectedTab === 'Saved'} badgeCount={0} onPress={() => setSelectedTab('Saved')} />
        <Tab label="Suggested" badgeCount={5} active={selectedTab === 'Suggested'} onPress={() => setSelectedTab('Suggested')} />
      </View>

      <View style={[styles.sectionContainer, styles.fullWidth]}>
        <SuggestionCard />
      </View>

      <View style={styles.separator} />
      <View style={[styles.sectionContainer, styles.groupBackground, styles.fullWidth]}>
        <GroupSection />
      </View>

      <View style={styles.separator} />
      <View style={[styles.sectionContainer, styles.fullWidth]}>
        <InterestsSection interests={INTERESTS} />
      </View>

      <View style={styles.separator} />
      <View style={[styles.sectionContainer, styles.featuredBackground, styles.fullWidth]}>
        <FeaturedSection />
      </View>

      <View style={styles.separator} />
      <View style={[styles.sectionContainer, styles.fullWidth]}>
        <RecommendedTopics topics={RECOMMENDED_TOPICS} />
      </View>

      <View style={styles.separator} />
      <View style={[styles.sectionContainer, styles.connectBackground, styles.fullWidth]}>
        <ConnectButton />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingBottom: 120,
    backgroundColor: '#fff',
    alignItems: 'stretch'
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    alignSelf: 'center',
  },
  sectionContainer: {
    padding: 16,
    borderRadius: 12,
    width: '100%',
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    marginVertical: 20,
  },
  groupBackground: {
    backgroundColor: '#f0f8ff',
  },
  featuredBackground: {
    backgroundColor: '#fef9ef',
  },
  connectBackground: {
    backgroundColor: '#f5f5f5',
  },
});
