import React from 'react';

import { AuthenticationProvider } from './authentication/authentication.context';
import { FavouritesProvider } from './favourites/favourites.context';
import { LocationProvider } from './location/location.context';
import { RestaurantsProvider } from './restaurants/restaurants.context';

const AppProvider: React.FC = ({ children }) => (
  <AuthenticationProvider>
    <FavouritesProvider>
      <LocationProvider>
        <RestaurantsProvider>{children}</RestaurantsProvider>
      </LocationProvider>
    </FavouritesProvider>
  </AuthenticationProvider>
);

export default AppProvider;
