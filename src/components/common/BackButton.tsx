import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface BackButtonProps {
  label?: string;
  color?: string;
  onPress?: () => void;
}

const BackButton = ({
  label = 'Back',
  color = '#111',
  onPress,
}: BackButtonProps) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.container}
        onPress={handlePress}
        activeOpacity={0.7}
        hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
      >
        <Ionicons
          name={Platform.OS === 'ios' ? 'chevron-back' : 'arrow-back'}
          size={24}
          color={color}
        />

        {/* Show text mostly on iOS */}
        {Platform.OS === 'ios' && (
          <Text style={[styles.text, { color }]}>{label}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    
    zIndex: 100, 
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8, // Add padding here to make the hit-area larger
    paddingHorizontal: 4,
  },
  text: {
    fontSize: 17,
    fontWeight: '500',
    marginLeft: Platform.OS === 'ios' ? -2 : 4,
  },
});
export default BackButton;