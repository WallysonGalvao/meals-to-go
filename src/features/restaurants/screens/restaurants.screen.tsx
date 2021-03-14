import React from 'react';
import { Searchbar } from 'react-native-paper';

import { Spacer } from 'components/spacer/spacer.component';
import { SafeArea } from 'components/utility/safe-area.components';
import RestaurantInfoCard, {
  RestaurantInfoCardProps,
} from '../components/restaurant-info-card.component';

import restaurants from '../mock';

import * as S from './restaurants.styles';

export const RestaurantsScreen = (): JSX.Element => {
  const keyExtractor = (item: RestaurantInfoCardProps) => String(item.id);

  const renderItem = ({ item }: { item: RestaurantInfoCardProps }) => {
    return (
      <Spacer position="bottom" size="large">
        <RestaurantInfoCard {...item} />
      </Spacer>
    );
  };
  return (
    <SafeArea>
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
