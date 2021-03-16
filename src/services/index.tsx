import React from 'react';

import { FavouritesProvider } from './favourites/favourites.context';
import { LocationProvider } from './location/location.context';
import { RestaurantsProvider } from './restaurants/restaurants.context';

const AppProvider: React.FC = ({ children }) => (
  <FavouritesProvider>
    <LocationProvider>
      <RestaurantsProvider>{children}</RestaurantsProvider>
    </LocationProvider>
  </FavouritesProvider>
);

export default AppProvider;
