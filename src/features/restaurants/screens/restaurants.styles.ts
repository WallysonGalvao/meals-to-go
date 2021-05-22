import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { ActivityIndicator, Colors, Button } from 'react-native-paper';

import { RestaurantProps } from 'services/restaurants/types';

export const SearchContainer = styled.View`
  ${({ theme }) => css`
    padding: ${theme.space[3]};
  `}
`;

export const RestaurantList = styled(
  FlatList as new () => FlatList<RestaurantProps>,
).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const Loading = styled(ActivityIndicator).attrs({
  animating: true,
  color: Colors.blue300,
  size: 50,
})`
  margin-left: -25px;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const OrderButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.brand.primary,
}))`
  ${({ theme }) => css`
    padding: ${theme.space[2]};
    width: 80%;
    align-self: center;
  `}
`;
