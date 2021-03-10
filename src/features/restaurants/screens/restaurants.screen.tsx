import React from 'react';
import { Searchbar } from 'react-native-paper';
import { StatusBar, SafeAreaView } from 'react-native';
import styled, { css } from 'styled-components/native';

import { RestaurantInfoCard } from '../components/restaurant-info-card.component';

import restaurant from '../mock';

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const SearchContainer = styled.View`
  ${({ theme }) => css`
    padding: ${theme.space[3]};
  `}
`;

const RestaurantListContainer = styled.View`
  ${({ theme }) => css`
    flex: 1;
    padding: ${theme.space[3]};
  `}
`;

export const RestaurantsScreen = (): JSX.Element => (
  <SafeArea>
    <SearchContainer>
      <Searchbar />
    </SearchContainer>
    <RestaurantListContainer>
      <RestaurantInfoCard {...restaurant} />
    </RestaurantListContainer>
  </SafeArea>
);
