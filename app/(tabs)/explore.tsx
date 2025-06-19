import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';


import EmptyExploreInfo from '@/components/EmptyExplore';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function exploreScreen() {
  return (

      // <SafeAreaView  style={styles.container }>
      <View>
        <SafeAreaView style={styles.row}>
          <TextInput placeholder="Explore near you" style={{ padding: 15, position: 'relative', borderWidth: 0, borderColor: 'blue', borderRadius: 5 }} />
          <Ionicons name="filter" size={30} color="white" style={{ backgroundColor: 'gray', position: 'absolute', right: 20, top: 5 }} />

        </SafeAreaView>

              <View style={styles.row}>
                <TouchableOpacity style={styles.btn}><Text>Upcoming</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btn}><Text>Today</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btn}><Text>Tomorrow</Text></TouchableOpacity>
                <TouchableOpacity style={styles.btn}><Text>Weekend</Text></TouchableOpacity>
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
btn: {
  backgroundColor: 'gray',
  padding:5,
  marginHorizontal: 5,
  borderRadius: 10,
  flex: 1,
  alignItems: 'center'
},
row: {
  flexDirection: 'row',
  justifyContent: 'center',
  marginTop: 5,
  marginBottom: 5,
},
top:{
    padding: 1

}
});
