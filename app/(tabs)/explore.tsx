import { StyleSheet } from 'react-native';
import ExploreContentInfo from '../ExploreContent';
import { View } from '@/components/Themed'; // Assuming Themed.View handles light/dark
import ExploreHeader from '../exploreHeader';

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <ExploreHeader />

      <View style={styles.content}>
        <ExploreContentInfo />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Let screen fill vertically
    backgroundColor: 'transparent', // Let Themed.View handle colors
  },
  content: {
    flex: 1, // This makes ExploreContentInfo scroll properly
    paddingHorizontal: 0,
    paddingTop: 8,
  },
});
