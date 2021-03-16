import React, { createContext, useState, useContext } from 'react';
import { RestaurantProps } from 'services/restaurants/mock';

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

export const FavouritesProvider = ({ children }: Props): JSX.Element => {
  const [favourites, setFavourites] = useState<Favorites[]>([]);

  const add = (restaurant: RestaurantProps) => {
    setFavourites([...favourites, restaurant]);
  };

  const remove = (restaurant: RestaurantProps) => {
    const newFavourites = favourites.filter(
      favorite => favorite.placeId !== restaurant.placeId,
    );

    setFavourites(newFavourites);
  };
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
