import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function PostDetailsScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* 1. Post Image */}
      <Image source={require('../assets/images/p2.jpg')} style={styles.image} />

      {/* 2. Title */}
      <Text style={styles.title}>Tech for Africa 2025</Text>

      <View style={styles.sectionSeparator} />

      {/* 3. Date */}
      <View style={styles.row}>
        <Ionicons name="calendar" size={20} color="#555" />
        <Text style={styles.text}> July 25, 2025</Text>
      </View>

      <View style={styles.sectionSeparator} />

      {/* 4. Online Event Link */}
      <View style={styles.row}>
        <Ionicons name="videocam" size={20} color="#555" />
        <Text style={styles.text}> Zoom Link: zoom.com/africa2025</Text>
      </View>

      <View style={styles.sectionSeparator} />

      {/* 5. Collaborators */}
      <Text style={styles.heading}>Collaborators</Text>
      <View style={styles.collabContainer}>
        <Image source={require('../assets/images/p2.jpg')} style={styles.logo} />
        <Text style={styles.collabText}>DE-WAY ART x CNTWK</Text>
      </View>

      <View style={styles.sectionSeparator} />

      {/* 6. About */}
      <Text style={styles.heading}>About</Text>
      <Text style={styles.text}>
        This is an innovative networking event built for developers, creatives,
        and entrepreneurs in Africa to connect, collaborate and build solutions
        for the continent's tech future. It’s not just a talk fest, it’s action!
      </Text>
      <TouchableOpacity>
        <Text style={styles.readMore}>Read more...</Text>
      </TouchableOpacity>

      <View style={styles.sectionSeparator} />

      {/* 7. Host + Going */}
      <View style={styles.rowBetween}>
        <Image source={require('/assets/images/adaptive-icon.png')} style={styles.hostProfile} />
        <TouchableOpacity style={styles.joinButton}>
          <Text style={styles.joinText}>Join</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionSeparator} />

      {/* 8. Summary of Who’ll Be There */}
      <Text style={styles.heading}>Who’s Coming?</Text>
      <Text style={styles.text}>
        Engineers, Designers, CEOs, Startup Founders, Students, and Investors
        from over 15 countries.
      </Text>

      <View style={styles.sectionSeparator} />

      {/* 9. Event Photos */}
      <Text style={styles.heading}>Event Photos</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Image source={require('../assets/images/CNETWK.jpg')} style={styles.eventPhoto} />
        <Image source={require('../assets/images/p2.jpg')} style={styles.eventPhoto} />
        <Image source={require('../assets/images/p2.jpg')} style={styles.eventPhoto} />
      </ScrollView>

      <View style={styles.sectionSeparator} />

      {/* 10. Comments */}
      <Text style={styles.heading}>Comments</Text>
      <Text style={styles.comment}>🔥 This event is going to be legendary!</Text>
      <Text style={styles.comment}>👀 I can't wait to connect with new people.</Text>
      <TouchableOpacity>
        <Text style={styles.addComment}>+ Add a Comment</Text>
      </TouchableOpacity>

      <View style={styles.sectionSeparator} />

      {/* 11. Similar Events */}
      <Text style={styles.heading}>Similar Events</Text>
      <Text style={styles.text}>- HackTheFuture GH</Text>
      <Text style={styles.text}>- Startups x Africa</Text>

      <View style={styles.sectionSeparator} />

      {/* 12. Thanks to Sponsors */}
      <Text style={styles.heading}>Thanks to Our Sponsors</Text>
      <Text style={styles.text}>- CNTWK, DE-WAY ART, and PurpleTech Africa</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fdfdfd',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d0078',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginVertical: 4,
  },
  heading: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
    color: '#4a148c',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  collabText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
  hostProfile: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  joinButton: {
    backgroundColor: '#7e22ce',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  joinText: {
    color: '#fff',
    fontWeight: '600',
  },
  readMore: {
    color: '#6200ea',
    marginTop: 4,
    fontWeight: 'bold',
  },
  comment: {
    fontSize: 15,
    marginVertical: 4,
    color: '#555',
  },
  addComment: {
    color: '#6200ea',
    fontWeight: 'bold',
    marginTop: 4,
  },
  eventPhoto: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 10,
    marginTop: 6,
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
});
