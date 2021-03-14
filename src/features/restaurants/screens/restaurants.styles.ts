import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { MockParsedProps } from 'services/restaurants/mock';

export const SearchContainer = styled.View`
  ${({ theme }) => css`
    padding: ${theme.space[3]};
  `}
`;

export const RestaurantList = styled(
  FlatList as new () => FlatList<MockParsedProps>,
).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

export const Loading = styled(ActivityIndicator).attrs({
  animating: true,
  color: Colors.blue300,
})`
  margin-left: -25px;
`;

export const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;
