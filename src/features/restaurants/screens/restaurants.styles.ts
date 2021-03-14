import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';

import { RestaurantInfoCardProps } from '../components/restaurant-info-card.component';

export const SearchContainer = styled.View`
  ${({ theme }) => css`
    padding: ${theme.space[3]};
  `}
`;

export const RestaurantList = styled(
  FlatList as new () => FlatList<RestaurantInfoCardProps>,
).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;
