import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

import RestaurantsScreen from 'features/restaurants/screens/restaurants.screen';
import RestaurantDetail from 'features/restaurants/screens/restaurant-detail.screen';

import { MockParsedProps } from 'services/restaurants/mock';

export type RootStackParamList = {
  Restaurants: undefined;
  RestaurantDetail: { restaurant: MockParsedProps };
};

const RestaurantStack = createStackNavigator<RootStackParamList>();

const RestaurantsNavigator = (): JSX.Element => {
  return (
    <RestaurantStack.Navigator
      headerMode="none"
      screenOptions={{ ...TransitionPresets.ModalPresentationIOS }}
    >
      <RestaurantStack.Screen
        name="Restaurants"
        component={RestaurantsScreen}
      />
      <RestaurantStack.Screen
        name="RestaurantDetail"
        component={RestaurantDetail}
      />
    </RestaurantStack.Navigator>
  );
};

export default RestaurantsNavigator;
