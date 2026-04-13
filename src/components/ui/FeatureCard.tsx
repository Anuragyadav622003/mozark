import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export type FeatureCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  colors: string[];
  onPress: () => void;
};

const FeatureCard = ({ title, subtitle, description, icon, colors, onPress }: FeatureCardProps) => {
  return (
    <TouchableOpacity style={styles.cardWrapper} activeOpacity={0.85} onPress={onPress}>
      <LinearGradient colors={colors} style={styles.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <View style={styles.cardContent}>
          <Text style={styles.cardIcon}>{icon}</Text>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
            <Text style={styles.cardDescription}>{description}</Text>
          </View>
        </View>
        <Text style={styles.arrow}>→</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 18,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
  },
  card: {
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 130,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 42,
    marginRight: 18,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 6,
  },
  cardSubtitle: {
    color: 'rgba(255,255,255,0.88)',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  cardDescription: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 13,
    lineHeight: 20,
  },
  arrow: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: 28,
    fontWeight: '900',
    marginLeft: 12,
  },
});

export default FeatureCard;
