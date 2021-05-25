import React from 'react';

import { AuthenticationProvider } from './authentication/authentication.context';
import { FavouritesProvider } from './favourites/favourites.context';
import { LocationProvider } from './location/location.context';
import { RestaurantsProvider } from './restaurants/restaurants.context';
import { CartContextProvider } from './cart/cart.context';

const AppProvider: React.FC = ({ children }) => (
  <AuthenticationProvider>
    <FavouritesProvider>
      <LocationProvider>
        <RestaurantsProvider>
          <CartContextProvider>{children}</CartContextProvider>
        </RestaurantsProvider>
      </LocationProvider>
    </FavouritesProvider>
  </AuthenticationProvider>
);

export default AppProvider;
