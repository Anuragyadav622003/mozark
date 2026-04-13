import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Project Imports
import { Colors } from '../theme/colors';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfleScreen';
import SettingsScreen from '../screens/SettingScreen';

const Tab = createBottomTabNavigator();

// Type-safe Icon Map
type TabRouteName = 'Home' | 'Profile' | 'Settings';
const iconMap: Record<TabRouteName, { active: string; inactive: string }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Profile: { active: 'person', inactive: 'person-outline' },
  Settings: { active: 'settings', inactive: 'settings-outline' },
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#8E8E93',
        // Responsive height: base height + safe area bottom inset
        tabBarStyle: [
          styles.tabBar,
          { 
            height: Platform.OS === 'ios' ? 60 + insets.bottom : 70,
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : 12,
          }
        ],
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ focused, color, size }) => {
          const icons = iconMap[route.name as TabRouteName];
          const iconName = focused ? icons.active : icons.inactive;
          
          return (
            <View style={focused ? styles.iconContainer : null}>
               <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#ffffff',
    position: 'absolute', // Optional: Use absolute if you want a floating effect
    borderTopWidth: 0.5,
    borderTopColor: '#E5E5E5',
    
    // Pro Shadow Handling
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 20,
      },
    }),
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -4,
  },
  iconContainer: {
    // Adding a subtle top-border or highlight for the active tab
    paddingTop: 4,
  }
});

export default TabNavigator;