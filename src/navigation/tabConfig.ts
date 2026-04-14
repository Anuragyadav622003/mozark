import type { ComponentType } from 'react';
import type { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type TabRouteName = 'Home' | 'Profile' | 'Settings';
export type TabParamList = Pick<RootStackParamList, TabRouteName>;

type TabIconConfig = {
  active: string;
  inactive: string;
};

export type TabConfig = {
  name: TabRouteName;
  component: ComponentType;
  icon: TabIconConfig;
};

export const TAB_CONFIG: readonly TabConfig[] = [
  {
    name: 'Home',
    component: HomeScreen,
    icon: { active: 'home', inactive: 'home-outline' },
  },
  {
    name: 'Profile',
    component: ProfileScreen,
    icon: { active: 'person', inactive: 'person-outline' },
  },
  {
    name: 'Settings',
    component: SettingsScreen,
    icon: { active: 'settings', inactive: 'settings-outline' },
  },
] as const;

export const TAB_BAR_LAYOUT = {
  iosHeight: 60,
  androidHeight: 70,
  androidBottomPadding: 12,
} as const;
