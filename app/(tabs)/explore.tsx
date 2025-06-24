import { StyleSheet } from 'react-native';


import EmptyExploreInfo from '@/components/ExploreContent';
import { Text, View } from '@/components/Themed';
import ExploreHeader from '../exploreHeader';

export default function exploreScreen() {
  return (
      <View>

<View>
  <ExploreHeader />
 {/* Other components */}
</View>
      
    <View style={styles.top}>
      <Text style={styles.title}>Explore</Text>
      <EmptyExploreInfo path="app/(tabs)/exploreScreen.tsx" />
    </View>
    {/* </SafeAreaView> */}
    </View>
  );
}

const styles = StyleSheet.create({

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
top:{
    padding: 1

}
});
