import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import type { OcrImage } from '../types';

type OcrImageCardProps = {
  image: OcrImage;
  onPress: (image: OcrImage) => void;
};

const OcrImageCard = ({ image, onPress }: OcrImageCardProps) => (
  <TouchableOpacity
    style={[styles.imageContainer, { backgroundColor: image.backgroundColor }, image.clickable && styles.clickableImage]}
    onPress={() => onPress(image)}
  >
    <Text style={styles.imageText}>{image.text}</Text>
    {image.clickable && (
      <Text style={styles.clickableLabel}>TAP TO ANALYZE</Text>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    minWidth: 150,
    height: 150,
    borderRadius: 12,
    padding: 12,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  clickableImage: {
    borderWidth: 2,
    borderColor: '#667eea',
  },
  imageText: {
    fontSize: 12,
    color: '#2d3748',
    textAlign: 'center',
    lineHeight: 16,
  },
  clickableLabel: {
    marginTop: 10,
    backgroundColor: 'rgba(102, 126, 234, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textAlign: 'center',
    overflow: 'hidden',
  },
});

export default OcrImageCard;
