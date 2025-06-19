import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';


import EmptyExploreInfo from '@/components/EmptyExplore';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function exploreScreen() {
  return (

      // <SafeAreaView  style={styles.container }>
      <View>
        <SafeAreaView style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 15,
  }}>
    <TextInput
      placeholder="Explore near you"
      style={{
        flex: 1,
        padding: 10,
        borderWidth: 0,
        backgroundColor: 'red',
        fontSize: 16,
      }}
    />
    <Ionicons
      name="color-filter-outline"
      size={24}
      color="black"
      style={{
        backgroundColor: 'thistle',
        padding: 6,
        borderRadius: 8,
      }}
    />
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
  backgroundColor: '#f0f0f0',
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
