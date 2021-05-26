import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import MapScreen from 'features/map/screens/map.screen';

import theme from 'infrastructure/theme';

import SettingsNavigator from './settings.navigator';
import RestaurantsNavigator from './restaurants.navigator';
import { CheckoutNavigator } from './checkout.navigator';

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Settings: 'md-settings',
  Checkout: 'md-cart',
};

type TabBarIconProps = {
  color: string;
  size: number;
};

export type RootBottomParamList = {
  Restaurants: undefined;
  Map: undefined;
  Settings: undefined;
  Checkout: undefined;
};

/* type Route = {
  route: RouteProp<RootBottomParamList, 'Restaurants'>;
}; */

type Route = {
  route: {
    name: keyof typeof TAB_ICON;
  };
};

const Tab = createBottomTabNavigator<RootBottomParamList>();

const createScreenOptions = ({ route }: Route) => {
  const iconName: any = TAB_ICON[route.name];

  return {
    tabBarIcon: ({ size, color }: TabBarIconProps): React.ReactNode => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

const AppNavigator = (): JSX.Element => {
  return (
    <Tab.Navigator
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: theme.colors.brand.primary,
        inactiveTintColor: theme.colors.brand.muted,
      }}
    >
      <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
      <Tab.Screen name="Checkout" component={CheckoutNavigator} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Settings" component={SettingsNavigator} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
