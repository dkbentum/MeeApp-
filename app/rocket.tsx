import { Text } from '@/components/Themed';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, useColorScheme, View, ScrollView, Image } from 'react-native';

export default function AboutCNETWKScreen() {
  const theme = useColorScheme();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <View style={styles.headerSection}>
        <Image source={require('../assets/images/CNETWK.png')} style={styles.logo} />
        <Text style={styles.title}>About CNET-WK</Text>
        <Text style={styles.subtitle}>Connect. Work. Grow. Together.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.sectionText}>
          CNET-WK is your all-in-one platform to discover, join, and create meaningful connections and work opportunities. We believe in the power of community, collaboration, and shared growth.
        </Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        <Text style={styles.sectionText}>• Discover CNETs & WK sessions tailored to your interests</Text>
        <Text style={styles.sectionText}>• Connect with like-minded people and teams</Text>
        <Text style={styles.sectionText}>• Organize and join collaborative work sessions</Text>
        <Text style={styles.sectionText}>• Stay updated with notifications and recommendations</Text>
        <Text style={styles.sectionText}>• Build your network and grow your skills</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meet the Team</Text>
        <Text style={styles.sectionText}>CNET-WK is built by a passionate team of developers, designers, and community builders who believe in the future of collaborative work and connection.</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact & Credits</Text>
        <Text style={styles.sectionText}>Questions, feedback, or want to join us? Email: support@cnetwk.app</Text>
        <Text style={styles.sectionText}>© {new Date().getFullYear()} CNET-WK. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: isDark ? '#181828' : '#F6F0FF',
    alignItems: 'center',
    padding: 24,
    paddingBottom: 60,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: isDark ? '#E0D4FF' : '#6D0080',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: isDark ? '#bbb' : '#888',
    marginBottom: 10,
    textAlign: 'center',
  },
  section: {
    backgroundColor: isDark ? '#23203a' : '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    width: '100%',
    shadowColor: isDark ? '#000' : '#aaa',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: isDark ? '#BB86FC' : '#6D0080',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 15,
    color: isDark ? '#E0D4FF' : '#333',
    marginBottom: 6,
    lineHeight: 22,
  },
});
