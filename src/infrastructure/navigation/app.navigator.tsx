import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import {Ionicons} from 'expo__vector-icons';

import { useAuth } from 'services/authentication/authentication.context';

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

const Settings = () => {
  const { onLogout } = useAuth();
  return (
    <SafeArea>
      <Text>Settings</Text>
      <Button title="logout" onPress={() => onLogout()} />
    </SafeArea>
  );
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
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Restaurants" component={RestaurantsNavigator} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default AppNavigator;
