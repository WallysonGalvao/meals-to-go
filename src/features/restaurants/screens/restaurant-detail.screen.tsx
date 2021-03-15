import React from 'react';
import { RouteProp } from '@react-navigation/native';

import { RootStackParamList } from 'infrastructure/navigation/restaurants.navigator';

import SafeArea from 'components/utility/safe-area.components';
import RestaurantInfoCard from '../components/restaurant-info-card.component';

type RestaurantDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  'RestaurantDetail'
>;

type Props = {
  route: RestaurantDetailScreenRouteProp;
};

const RestaurantDetailScreen = ({ route }: Props): JSX.Element => {
  const { restaurant } = route.params;

  return (
    <SafeArea>
      <RestaurantInfoCard {...restaurant} />
    </SafeArea>
  );
};

export default RestaurantDetailScreen;
