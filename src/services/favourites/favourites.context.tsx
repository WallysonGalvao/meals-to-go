import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { RestaurantProps } from 'services/restaurants/types';
import { useAuth } from 'services/authentication/authentication.context';

type Favorites = RestaurantProps;

type FavouritesContextData = {
  favourites: Favorites[];
  addToFavourites: (restaurant: RestaurantProps) => void;
  removeFromFavourites: (restaurant: RestaurantProps) => void;
};

type Props = {
  children: React.ReactNode;
};

const FavouritesContext = createContext<FavouritesContextData>(
  {} as FavouritesContextData,
);

const STORAGE_FAVOURITES = '@favourites';

export const FavouritesProvider = ({ children }: Props): JSX.Element => {
  const { user } = useAuth();

  const [favourites, setFavourites] = useState<Favorites[]>([]);

  const saveFavourites = async (value: Favorites[], uid: string) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(`${STORAGE_FAVOURITES}-${uid}`, jsonValue);
    } catch (e) {
      console.error('error storing', e);
    }
  };

  const loadFavourites = async (uid: string) => {
    try {
      const value = await AsyncStorage.getItem(`${STORAGE_FAVOURITES}-${uid}`);
      if (value !== null) setFavourites(JSON.parse(value));
    } catch (e) {
      console.error('error loading', e);
    }
  };

  const add = (restaurant: RestaurantProps) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant: RestaurantProps) => {
    const newFavourites = favourites.filter(
      favorite => favorite.placeId !== restaurant.placeId,
    );

    setFavourites(newFavourites);
  };

  useEffect(() => {
    if (user && user.uid) {
      loadFavourites(user.uid);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.uid && favourites.length) {
      saveFavourites(favourites, user.uid);
    }
  }, [favourites, user]);

  return (
    <FavouritesContext.Provider
      value={{
        favourites,
        addToFavourites: add,
        removeFromFavourites: remove,
      }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};

export function useFavorite(): FavouritesContextData {
  const context = useContext(FavouritesContext);

  if (!context)
    throw new Error('useFavorite must be used within an FavoriteProvider');

  return context;
}
