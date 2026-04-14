import React from 'react';
import { StyleSheet, Platform, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Colors } from '../theme/colors';
import { TAB_BAR_LAYOUT, TAB_CONFIG, TabParamList, TabRouteName } from './tabConfig';

const Tab = createBottomTabNavigator<TabParamList>();

const getTabIconName = (routeName: TabRouteName, focused: boolean): string => {
  const tab = TAB_CONFIG.find((item) => item.name === routeName);
  if (!tab) {
    return 'ellipse-outline';
  }
  return focused ? tab.icon.active : tab.icon.inactive;
};

const TabNavigator = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: [
          styles.tabBar,
          {
            height: Platform.OS === 'ios'
              ? TAB_BAR_LAYOUT.iosHeight + insets.bottom
              : TAB_BAR_LAYOUT.androidHeight,
            paddingBottom: Platform.OS === 'ios' ? insets.bottom : TAB_BAR_LAYOUT.androidBottomPadding,
          }
        ],
        tabBarLabelStyle: styles.label,
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = getTabIconName(route.name, focused);

          return (
            <View style={focused ? styles.iconContainer : null}>
              <Ionicons name={iconName} size={size} color={color} />
            </View>
          );
        },
      })}
    >
      {TAB_CONFIG.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.white,
    position: 'absolute',
    borderTopWidth: 0.5,
    borderTopColor: Colors.border,
    ...Platform.select({
      ios: {
        shadowColor: Colors.black,
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
    paddingTop: 4,
  }
});

export default TabNavigator;