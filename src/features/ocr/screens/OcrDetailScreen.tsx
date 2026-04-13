import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Platform,
} from 'react-native';
import { useNavigation, useRoute, NavigationProp } from '@react-navigation/native';
import { TextDetailRouteProp, RootStackParamList } from '../../../navigation/types';
import BackButton from '../../../components/common/BackButton';

const { width } = Dimensions.get('window');

const OcrDetailScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<TextDetailRouteProp>();
  const { image } = route.params;

  const ocrResults = {
    confidence: 98.7,
    language: 'English',
    textBlocks: [
      {
        text: 'INVOICE',
        confidence: 99.2,
        bounds: { x: 50, y: 20, width: 100, height: 30 },
      },
      {
        text: 'Date: 2024-01-15',
        confidence: 97.8,
        bounds: { x: 50, y: 60, width: 150, height: 20 },
      },
      {
        text: 'Amount: $299.99',
        confidence: 98.5,
        bounds: { x: 50, y: 90, width: 130, height: 20 },
      },
      {
        text: 'Thank you for your business!',
        confidence: 96.3,
        bounds: { x: 30, y: 130, width: 200, height: 25 },
      },
    ],
    processingTime: '0.23s',
    totalCharacters: 67,
  };

  return (
    <SafeAreaView style={styles.container}>
     <View style={styles.headerActionRow}>
        <BackButton />
      </View>
      <View style={styles.header}>
     
        <Text style={styles.title}>OCR Analysis Results</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Original Document</Text>
          <View style={[styles.imagePreview, { backgroundColor: image.backgroundColor }]}> 
            <Text style={styles.previewText}>{image.text}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Analysis Summary</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Confidence</Text>
              <Text style={styles.statValue}>{ocrResults.confidence}%</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Language</Text>
              <Text style={styles.statValue}>{ocrResults.language}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Processing Time</Text>
              <Text style={styles.statValue}>{ocrResults.processingTime}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Characters</Text>
              <Text style={styles.statValue}>{ocrResults.totalCharacters}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Extracted Text Blocks</Text>
          {ocrResults.textBlocks.map((block, index) => (
            <View key={index} style={styles.textBlock}>
              <View style={styles.textBlockHeader}>
                <Text style={styles.textBlockText}>"{block.text}"</Text>
                <Text style={styles.confidenceBadge}>{block.confidence}%</Text>
              </View>
              <View style={styles.boundsInfo}>
                <Text style={styles.boundsText}>
                  Position: ({block.bounds.x}, {block.bounds.y}) • Size: {block.bounds.width}×{block.bounds.height}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced Features</Text>
          <View style={styles.featuresGrid}>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>📊 Export Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>🔍 Search Text</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>📝 Edit Text</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.featureButton}>
              <Text style={styles.featureButtonText}>📤 Share Results</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Real-time Processing Demo</Text>
          <View style={styles.processingDemo}>
            <Text style={styles.demoText}>🔍 Scanning document...</Text>
            <View style={styles.progressBar}>
              <View style={styles.progressFill} />
            </View>
            <Text style={styles.demoText}>✅ Text extraction complete!</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerActionRow: {
    paddingHorizontal: 12,
    paddingTop: Platform.OS === 'android' ? 10 : 0, // Adjust for Android Status Bar
    height: 40,
    justifyContent: 'center',
    zIndex: 100, // Keep this high
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  scrollContainer: {
    padding: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  imagePreview: {
    borderRadius: 12,
    padding: 20,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  previewText: {
    fontSize: 14,
    color: '#2d3748',
    textAlign: 'center',
    lineHeight: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
  statItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: (width - 50) / 2 - 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  textBlock: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textBlockHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  textBlockText: {
    fontSize: 16,
    color: '#2d3748',
    flex: 1,
    fontStyle: 'italic',
  },
  confidenceBadge: {
    backgroundColor: '#48bb78',
    color: 'white',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  boundsInfo: {
    marginTop: 8,
  },
  boundsText: {
    fontSize: 12,
    color: '#718096',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureButton: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: (width - 50) / 2 - 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  processingDemo: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  demoText: {
    fontSize: 16,
    color: '#2d3748',
    marginVertical: 8,
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginVertical: 12,
    overflow: 'hidden',
  },
  progressFill: {
    width: '100%',
    height: '100%',
    backgroundColor: '#48bb78',
    borderRadius: 4,
  },
});

export default OcrDetailScreen;
