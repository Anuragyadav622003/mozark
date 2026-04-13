import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

type AppTextProps = TextProps & {
  children: React.ReactNode;
};

const AppText = ({ style, children, ...props }: AppTextProps) => (
  <Text style={[styles.text, style]} {...props}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  text: {
    color: '#2d3748',
    fontSize: 16,
    lineHeight: 24,
  },
});

export default AppText;
