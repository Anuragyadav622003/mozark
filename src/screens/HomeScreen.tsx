import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import FeatureCard from '../components/ui/FeatureCard';
import { Colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const cards = useMemo(
    () => [
      {
        id: 'text-identification',
        title: 'Text Identification',
        subtitle: 'OCR & Text Recognition',
        description: 'Tap the invoice image to start a text extraction workflow.',
        gradient: ['#667eea', '#764ba2'],
        icon: '📝',
        screen: 'TextIdentification' as const,
      },
      {
        id: 'scroll-swipe',
        title: 'Scroll & Swipe',
        subtitle: 'List + Interaction Playground',
        description: 'Explore a scrollable task panel and add new list items on the fly.',
        gradient: ['#f093fb', '#f5576c'],
        icon: '🎯',
        screen: 'ScrollSwipe' as const,
      },
      {
        id: 'animation-demo',
        title: 'Animation Lab',
        subtitle: 'Loader & Motion Tests',
        description: 'Inspect polished loading animations inspired by InstaBIZ flows.',
        gradient: ['#34d399', '#10b981'],
        icon: '✨',
        screen: 'Animation' as const,
      },
    ],
    []
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Optics Super App</Text>
          <Text style={styles.subtitle}>Designed for framework validation and quick interaction tests.</Text>
        </View>

        <View style={styles.cardsContainer}>
          {cards.map((card) => (
            <FeatureCard
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              description={card.description}
              icon={card.icon}
              colors={card.gradient}
              onPress={() => navigation.navigate(card.screen)}
            />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Designed for rapid QA</Text>
          <Text style={styles.footerText}>
            Each card launches a complete testing flow, with real content and interactive controls.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 34,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#52606d',
    fontWeight: '500',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  cardsContainer: {
    marginBottom: 20,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 14,
    color: '#52606d',
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
});

export default HomeScreen;