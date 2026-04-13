import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';

type AppButtonProps = TouchableOpacityProps & {
  label: string;
};

const AppButton = ({ label, style, ...props }: AppButtonProps) => (
  <TouchableOpacity style={[styles.button, style]} {...props}>
    <Text style={styles.label}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#667eea',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  label: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default AppButton;
