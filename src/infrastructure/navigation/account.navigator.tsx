import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AccountScreen from 'features/account/screens/account.screen';
import LoginScreen from 'features/account/screens/login.screen';
import RegisterScreen from 'features/account/screens/register.screen';

type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Regiser: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AccountNavigator = (): JSX.Element => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="Main" component={AccountScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Regiser" component={RegisterScreen} />
  </Stack.Navigator>
);

export default AccountNavigator;
