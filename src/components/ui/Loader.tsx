import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TextStyle } from 'react-native';

type LoaderProps = {
  message?: string;
  textStyle?: TextStyle;
};

const Loader = ({ message = 'Loading...', textStyle }: LoaderProps) => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#667eea" />
    <Text style={[styles.message, textStyle]}>{message}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  message: {
    marginTop: 12,
    color: '#4a5568',
    fontSize: 14,
  },
});

export default Loader;
