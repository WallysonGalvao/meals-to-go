import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import {Ionicons} from 'expo__vector-icons';

import MapScreen from 'features/map/screens/map.screen';
import RestaurantsNavigator from './restaurants.navigator';

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Settings: 'md-settings',
};

type TabBarIconProps = {
  color: string;
  size: number;
};

export type RootBottomParamList = {
  Restaurants: undefined;
  Map: undefined;
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
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={createScreenOptions}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
        <Tab.Screen name="Map" component={MapScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
