import React from 'react';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

import SettingsScreen from 'features/settings/screens/settings.screen';
import FavouritesScreen from 'features/settings/screens/favourites.screen';

export type RootStackParamList = {
  Settings: undefined;
  Favourites: undefined;
};

const SettingsStack = createStackNavigator<RootStackParamList>();

const SettingsNavigator = (): JSX.Element => {
  return (
    <SettingsStack.Navigator
      headerMode="screen"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        options={{
          header: () => null,
        }}
        name="Settings"
        component={SettingsScreen}
      />
      <SettingsStack.Screen name="Favourites" component={FavouritesScreen} />
    </SettingsStack.Navigator>
  );
};

export default SettingsNavigator;
