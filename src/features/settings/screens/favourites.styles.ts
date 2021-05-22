import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import SafeArea from 'components/utility/safe-area.components';

import { RestaurantProps } from 'services/restaurants/types';

export const NoFavouritesArea = styled(SafeArea)`
  align-items: center;
  justify-content: center;
`;

export const RestaurantList = styled(
  FlatList as new () => FlatList<RestaurantProps>,
).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
