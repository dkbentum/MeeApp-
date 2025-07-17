import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import ExploreContentInfo from '../ExploreContent';
import { View } from '@/components/Themed'; // Assuming Themed.View handles light/dark
import ExploreHeader from '../exploreHeader';

export default function ExploreScreen() {
  const [selectedTimeTab, setSelectedTimeTab] = useState('Upcoming');
  const [selectedCategory, setSelectedCategory] = useState('All Events');

  return (
    <View style={styles.container}>
      <ExploreHeader
        selectedTimeTab={selectedTimeTab}
        setSelectedTimeTab={setSelectedTimeTab}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <View style={styles.content}>
        <ExploreContentInfo
          selectedTimeTab={selectedTimeTab}
          selectedCategory={selectedCategory}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
