import { StyleSheet } from 'react-native';

import HomeContentInfo from '@/components/HomeContent';
import { View } from '@/components/Themed';

export default function homeScreen() {
  return (
    <View>
      {/* <View style={{backgroundColor:'red', flex:1}}> <Text></Text></View> */}
    <View style={styles.container}>
      <HomeContentInfo />
    </View>
    </View>
  );
}

// Styles for the home screen
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
}
);
