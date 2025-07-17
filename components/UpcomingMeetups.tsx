import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

const UpcomingMeetups = ({ events }: { events: string[] }) => {
  const isDark = useColorScheme() === 'dark';
  return (
    <View style={[styles.card, { backgroundColor: isDark ? '#121212' : '#faf5ff' }]}>
      <Text style={[styles.title, { color: isDark ? '#fff' : '#4B0082' }]}>📅 Upcoming Meetups</Text>
      {events.length === 0 ? (
        <Text style={[styles.empty, { color: isDark ? '#aaa' : '#777' }]}>No events yet</Text>
      ) : (
        events.map((e, idx) => (
          <Text key={idx} style={[styles.event, { color: isDark ? '#fff' : '#333' }]}>• {e}</Text>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
  },
  event: {
    fontSize: 15,
    marginBottom: 6,
  },
  empty: {
    fontStyle: 'italic',
  },
});

export default UpcomingMeetups;
