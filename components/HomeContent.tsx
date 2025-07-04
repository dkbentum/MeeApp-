import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const PURPLE = '#6A0DAD';
const LIGHT_PURPLE = '#F2E8FF';
const DARK_PURPLE = '#4B0082';
const INTERESTS = [
  'AI', 'Fitness', 'Startups', 'Music', 'Gaming', 'Tech Talks',
  'Design', 'Photography', 'Spirituality', 'Health', 'Entrepreneurship', 'Networking'
];

const RECOMMENDED_TOPICS = ['AI Events', 'UX Meetups', 'Weekend Hackathons', 'Remote Jobs', 'Local Workshops'];

export default function HomeContentInfo() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View><Text style={styles.title}>Work Events Ahead</Text></View>
      {/* Tabs */}
      <View style={styles.tabRow}>
        <Tab label="Going" />
        <Tab label="Saved" />
        <Tab label="Suggested" badgeCount={5} active />
      </View>

      {/* Suggestion Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Get suggestions for events</Text>
        <Text style={styles.cardText}>
          You have 5 suggestions for upcoming events
        </Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>View suggested events</Text>
        </TouchableOpacity>
      </View>

      {/* Your Groups */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your groups</Text>
        <Text style={styles.sectionText}>You have not joined any groups</Text>
        <Text style={styles.link}>Discover groups</Text>
      </View>

      {/* Start a new group */}
      <TouchableOpacity style={styles.groupStart}>
        <Text style={styles.groupTitle}>🏆 Start a new group</Text>
        <Text style={styles.groupText}>Organize your own events</Text>
      </TouchableOpacity>

      {/* Interests */}
      <View style={styles.section}>
        <View style={styles.interestHeader}>
          <Text style={styles.sectionTitle}>Your interests</Text>
          <Text style={styles.link}>Edit</Text>
        </View>
      </View>

      {/* Interest Tags */}
      <ScrollView horizontal style={styles.horizontalScroll} showsHorizontalScrollIndicator={false}>
        <View style={styles.tagWrap}>
          {INTERESTS.map((tag, index) => (
            <View style={styles.tag} key={index}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Featured Events */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔥 Featured Events</Text>
        <Text style={styles.sectionText}>Don’t miss out on trending events in your city</Text>
      </View>

      {/* Popular Groups */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👑 Popular Groups</Text>
        <Text style={styles.sectionText}>Join groups with the most active members</Text>
      </View>

      {/* Recommended Topics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧠 Recommended Topics</Text>
        {RECOMMENDED_TOPICS.map((topic, i) => (
          <Text style={styles.bulletText} key={i}>• {topic}</Text>
        ))}
      </View>

      {/* Connect & Work Button */}
      <TouchableOpacity style={styles.bigButton}>
        <Text style={styles.bigButtonText}>🤝 Connect & Work</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

type TabProps = {
  label: string;
  active?: boolean;
  badgeCount?: number;
};

const Tab: React.FC<TabProps> = ({ label, active, badgeCount }) => (
  <View style={[styles.tab, active && styles.activeTab]}>
    <Text style={[styles.tabText, active && styles.activeTabText]}>
      {label}
    </Text>
    {badgeCount ? (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badgeCount}</Text>
      </View>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: '#fff',
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: LIGHT_PURPLE,
    borderWidth: 1.5,
    borderColor: PURPLE,
  },
  tabText: {
    fontWeight: '600',
    color: '#444',
  },
  activeTabText: {
    color: PURPLE,
  },
  badge: {
    backgroundColor: PURPLE,
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 6,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 30,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: DARK_PURPLE,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: PURPLE,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: DARK_PURPLE,
    marginBottom: 6,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
  },
  link: {
    fontSize: 14,
    color: PURPLE,
    marginTop: 6,
  },
  groupStart: {
    backgroundColor: LIGHT_PURPLE,
    padding: 16,
    borderRadius: 10,
    marginBottom: 30,
  },
  groupTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: PURPLE,
  },
  groupText: {
    fontSize: 13,
    color: '#555',
  },
  interestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  horizontalScroll: {
    marginBottom: 30,
  },
  tagWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: LIGHT_PURPLE,
    borderColor: PURPLE,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: PURPLE,
    fontWeight: '600',
  },
  bulletText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4,
  },
  bigButton: {
    marginTop: 20,
    marginBottom: 50,
    backgroundColor: PURPLE,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  bigButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
});
