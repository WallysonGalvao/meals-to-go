import React, { useContext } from 'react';
import { Searchbar } from 'react-native-paper';

import Spacer from 'components/spacer/spacer.component';
import SafeArea from 'components/utility/safe-area.components';
import { RestaurantsContext } from 'services/restaurants/restaurants.context';
import { MockParsedProps } from 'services/restaurants/mock';

import RestaurantInfoCard from '../components/restaurant-info-card.component';

import * as S from './restaurants.styles';

export const RestaurantsScreen = (): JSX.Element => {
  const { restaurants, isLoading } = useContext(RestaurantsContext);

  const keyExtractor = (item: MockParsedProps) => item.placeId;

  const renderItem = ({ item }: { item: MockParsedProps }) => {
    return (
      <Spacer position="bottom" size="large">
        <RestaurantInfoCard {...item} />
      </Spacer>
    );
  };
  return (
    <SafeArea>
      {isLoading && (
        <S.LoadingContainer>
          <S.Loading size={50} />
        </S.LoadingContainer>
      )}
      <S.SearchContainer>
        <Searchbar />
      </S.SearchContainer>
      <S.RestaurantList
        data={restaurants}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </SafeArea>
  );
};
