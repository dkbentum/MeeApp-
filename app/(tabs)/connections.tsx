import React from 'react';
import { ScrollView, StyleSheet, View, useColorScheme } from 'react-native';
import ExploreConnectionsCard from '../../components/ExploreConnectionsCard';
import NoConnectionsIllustration from '../../components/NoConnectionsIllustration';
import HowToConnectSection from '../../components/HowToConectSection';
import ConnectedPersonCard from '../../components/ConnectedPersonCard';
import MutualSkillsCard from '@/components/MutualSkillsCard';
import YourWKPosts from '../../components/YourWKPosts';
import imageF from '../../assets/images/imagesF.jpeg';

export default function ConnectionsScreen() {
  const isDark = useColorScheme() === 'dark';

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
      <ExploreConnectionsCard />
      <NoConnectionsIllustration />
      <View style={styles.separator} />
      <ConnectedPersonCard name={'Jane Doe'} title={'UI/UX Designer'} avatar={imageF}/>
      <HowToConnectSection />
      <MutualSkillsCard skills={['list', 'of', 'mutual', 'skills' ]}/>
      <YourWKPosts />
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    marginVertical: 24,
  },
});
