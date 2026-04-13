import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from '../TabNavigator';
import { RootStackParamList } from '../types';
import { OcrScreen, OcrDetailScreen } from '../../features/ocr';
import { ScrollSwipeScreen } from '../../features/scrollSwipe';
import { AnimationScreen } from '../../features/animation';

const Stack = createStackNavigator<RootStackParamList>();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MainTabs" component={TabNavigator} />
    <Stack.Screen name="TextIdentification" component={OcrScreen} />
    <Stack.Screen name="TextDetail" component={OcrDetailScreen} />
    <Stack.Screen name="ScrollSwipe" component={ScrollSwipeScreen} />
    <Stack.Screen name="Animation" component={AnimationScreen} />
  </Stack.Navigator>
);

export default HomeStack;
