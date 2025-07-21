import React, { useMemo, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, useColorScheme } from 'react-native';

import ConnectButton from '../components/HomeConnectButton';
import FeaturedSection from '../components/HomeFeaturedSection';
import GroupSection from '../components/HomeGroupSection';
import InterestsSection from '../components/HomeInterestsSection';
import RecommendedTopics from '../components/HomeRecommendedTopics';
import SuggestionCard from '../components/HomeSuggestionCard';
import Tab from '../components/HomeTab';
import HomeWelcomeCard from '../components/HomeWelcomeCard';
import HomeFeaturedImage from '../components/HomeFeaturedImage';
import { useInterests } from './InterestsContext';

const RECOMMENDED_TOPICS = ['AI CNETs', 'UX WK Jams', 'Weekend WK Sprints', 'Remote WK', 'Local CNETs'];

export default function HomeContentInfo() {
  const [selectedTab, setSelectedTab] = useState('Suggested');
  const theme = useColorScheme(); // 'light' or 'dark'
  const isDark = theme === 'dark';
  const { interests } = useInterests();

  const themedStyles = useMemo(() => createStyles(isDark), [isDark]);

  return (
    <ScrollView contentContainerStyle={themedStyles.container}>
      <Text style={themedStyles.title}>CNET & WK Opportunities Ahead</Text>

      <View style={themedStyles.tabRow}>
        <Tab label="Going" active={selectedTab === 'Going'} badgeCount={0} onPress={() => setSelectedTab('Going')} />
        <Tab label="Saved" active={selectedTab === 'Saved'} badgeCount={0} onPress={() => setSelectedTab('Saved')} />
        <Tab label="Suggested" badgeCount={5} active={selectedTab === 'Suggested'} onPress={() => setSelectedTab('Suggested')} />
      </View>

      <View style={[themedStyles.sectionContainer, themedStyles.fullWidth]}>
        <SuggestionCard selectedTab={selectedTab} />
      </View>

      <View style={themedStyles.separator} />
      <View style={[themedStyles.sectionContainer, themedStyles.groupBackground, themedStyles.fullWidth]}>
        <GroupSection />
      </View>

      <View style={themedStyles.separator} />
      <View style={[themedStyles.sectionContainer, themedStyles.fullWidth]}>
        <InterestsSection interests={interests} />
      </View>

      <View style={themedStyles.separator} />
      <View style={[themedStyles.sectionContainer, themedStyles.featuredBackground, themedStyles.fullWidth]}>
        <FeaturedSection />
      </View>

      <View style={themedStyles.separator} />
      <View style={[themedStyles.sectionContainer, themedStyles.fullWidth]}>
        <RecommendedTopics topics={RECOMMENDED_TOPICS} />
      </View>

      <View style={themedStyles.separator} />
      {/* Only keep the featured image card above the ConnectButton */}
      <HomeFeaturedImage />
      <View style={[themedStyles.sectionContainer, themedStyles.connectBackground, themedStyles.fullWidth]}>
        <ConnectButton />
      </View>
    </ScrollView>
  );
}

const createStyles = (isDark: boolean) =>
  StyleSheet.create({
    container: {
      padding: 16,
      paddingBottom: 120,
      backgroundColor: isDark ? '#121212' : '#fff',
      alignItems: 'stretch',
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
      color: isDark ? '#f0f0f0' : '#333',
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
      borderBottomColor: isDark ? '#333' : '#eee',
      marginVertical: 20,
    },
    groupBackground: {
      backgroundColor: isDark ? '#1e2a36' : '#f0f8ff',
    },
    featuredBackground: {
      backgroundColor: isDark ? '#332b1e' : '#fef9ef',
    },
    connectBackground: {
      backgroundColor: isDark ? '#2a2a2a' : '#f5f5f5',
    },
  });
