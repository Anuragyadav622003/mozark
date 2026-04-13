import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../navigation/types';
import OcrImageCard from '../components/OcrImageCard';
import { images, textBlocks } from '../data';
import type { OcrImage } from '../types';
import BackButton from '../../../components/common/BackButton';

const OcrScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleImagePress = (image: OcrImage) => {
    if (image.clickable) {
      navigation.navigate('TextDetail', { image });
    } else {
      Alert.alert('Info', 'This image contains text but is not clickable in this demo.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
       <BackButton/>
      <View style={styles.screenHeader}>
      
        <View style={styles.headerTextGroup}>
          <Text style={styles.title}>Text Identification</Text>
          <Text style={styles.subtitle}>Advanced OCR Testing Environment</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Text Recognition Samples</Text>
          {textBlocks.map((block) => (
            <View key={block.id} style={styles.textBlock}>
              <Text style={styles.textBlockTitle}>{block.title}</Text>
              <Text style={[styles.textContent, block.orientation === 'vertical' && styles.verticalText]}>
                {block.content}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Document Images</Text>
          <Text style={styles.sectionSubtitle}>Tap the invoice image to see detailed text extraction</Text>
          <View style={styles.imagesGrid}>
            {images.map((image) => (
              <OcrImageCard key={image.id} image={image} onPress={handleImagePress} />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced Text Recognition</Text>
          <View style={styles.advancedTextContainer}>
            <Text style={[styles.advancedText, styles.boldText]}>Bold Text Recognition</Text>
            <Text style={[styles.advancedText, styles.italicText]}>Italic Text Recognition</Text>
            <Text style={[styles.advancedText, styles.underlineText]}>Underlined Text Recognition</Text>
            <Text style={[styles.advancedText, styles.strikethroughText]}>Strikethrough Text Recognition</Text>
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
  scrollContainer: {
    paddingTop: 110,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  screenHeader: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 18,
    paddingBottom: 14,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  headerTextGroup: {
    alignItems: 'center',
  },
  header: {
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2d3748',
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#718096',
    marginBottom: 15,
    lineHeight: 20,
  },
  textBlock: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textBlockTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4a5568',
    marginBottom: 10,
  },
  textContent: {
    fontSize: 16,
    color: '#2d3748',
    lineHeight: 24,
  },
  verticalText: {
    writingDirection: 'ltr',
    textAlign: 'left',
  },
  imagesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  advancedTextContainer: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  advancedText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#2d3748',
  },
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
  },
  underlineText: {
    textDecorationLine: 'underline',
  },
  strikethroughText: {
    textDecorationLine: 'line-through',
  },
});

export default OcrScreen;
