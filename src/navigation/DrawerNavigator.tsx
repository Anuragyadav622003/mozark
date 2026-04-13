import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your existing TabNavigator and other screens
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfleScreen';    // FIXED name
import SettingsScreen from '../screens/SettingScreen';  // FIXED name

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawer,
        drawerActiveTintColor: '#007AFF',
        drawerInactiveTintColor: '#333',
        headerShown: true, // Shows the "Hamburger" icon top-left
      }}
    >
      {/* 1. The main app content (Tabs) */}
      <Drawer.Screen 
        name="Dashboard" 
        component={TabNavigator} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="home-outline" size={22} color={color} />
        }}
      />

      {/* 2. Direct links to other screens */}
      <Drawer.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="person-outline" size={22} color={color} />
        }}
      />
      
      <Drawer.Screen 
        name="Settings" 
        component={SettingsScreen} 
        options={{
          drawerIcon: ({ color }) => <Ionicons name="settings-outline" size={22} color={color} />
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: '#fff',
    width: 280,
  },
});

export default DrawerNavigator;