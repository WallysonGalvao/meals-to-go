import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from 'services/authentication/authentication.context';
import AppNavigator from './app.navigator';
import AccountNavigator from './account.navigator';

const Navigation = (): JSX.Element => {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppNavigator /> : <AccountNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
