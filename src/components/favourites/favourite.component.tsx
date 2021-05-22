import React, { useMemo } from 'react';
import { AntDesign } from '@expo/vector-icons';

import { useFavorite } from 'services/favourites/favourites.context';
import { RestaurantProps } from 'services/restaurants/types';

import * as S from './favourite.styles';

type FavouriteProps = {
  restaurant: RestaurantProps;
};

const Favourite = ({ restaurant }: FavouriteProps): JSX.Element => {
  const { favourites, addToFavourites, removeFromFavourites } = useFavorite();

  const isFavourite = useMemo(() => {
    return favourites.find(r => r.placeId === restaurant.placeId);
  }, [favourites, restaurant.placeId]);

  return (
    <S.FavouriteButton
      onPress={() =>
        !isFavourite
          ? addToFavourites(restaurant)
          : removeFromFavourites(restaurant)
      }
    >
      <AntDesign
        name={isFavourite ? 'heart' : 'hearto'}
        size={24}
        color={isFavourite ? 'red' : 'white'}
      />
    </S.FavouriteButton>
  );
};

export default Favourite;
