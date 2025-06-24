import { StyleSheet } from 'react-native';


import EmptyExploreInfo from '@/components/EmptyExplore';
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
    // Add to styles:
// btn: {
//   backgroundColor: 'thistle',
//   padding:5,
//   marginHorizontal: 5,
//   borderRadius: 10,
//   flex: 1,
//   alignItems: 'center'
// },
// btns: {
//   backgroundColor: 'red',
//   padding:5,
//   marginHorizontal: 10,
//   borderRadius: 10,
//   flex: 1,
//   alignItems: 'center'
// },
// row: {
//   flexDirection: 'row',
//   justifyContent: 'center',
//   marginTop: 5,
//   marginBottom: 5,
  
// },
// rows: {
//   flexDirection: 'row',
//   justifyContent: 'center',
//   marginTop: 5,
//   marginBottom: 5,
  
// },
top:{
    padding: 1

}
});
