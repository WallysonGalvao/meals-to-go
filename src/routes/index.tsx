import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RestaurantsScreen } from 'features/restaurants/screens/restaurants.screen';

const TAB_ICON = {
  Restaurants: 'md-restaurant',
  Map: 'md-map',
  Settings: 'md-settings',
};

type TabBarIconProps = {
  color: string;
  size: number;
};

type RootBottomParamList = {
  // [key in typeof TAB_ICON]: undefined;
  Restaurants: undefined;
};

type Route = {
  route: RouteProp<RootBottomParamList, 'Restaurants'>;
};

const Tab = createBottomTabNavigator<RootBottomParamList>();

const createScreenOptions = ({ route }: Route) => {
  const iconName = TAB_ICON[route.name] as 'md-restaurant';

  return {
    tabBarIcon: ({ size, color }: TabBarIconProps): React.ReactNode => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

const Routes = (): JSX.Element => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={createScreenOptions}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Restaurants" component={RestaurantsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
