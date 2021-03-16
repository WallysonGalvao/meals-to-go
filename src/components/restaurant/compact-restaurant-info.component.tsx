import React from 'react';
import { Platform } from 'react-native';

import { RestaurantProps } from 'services/restaurants/mock';

import Text from '../typography/text.component';

import * as S from './compact-restaurant-info.styles';

type CompactRestaurantInfoProps = {
  restaurant: RestaurantProps;
};

const isAndroid = Platform.OS === 'android';

const CompactRestaurantInfo = ({
  restaurant,
}: CompactRestaurantInfoProps): JSX.Element => {
  return (
    <S.Item>
      {isAndroid ? (
        <S.CompactWebview source={{ uri: restaurant.photos[0] }} />
      ) : (
        <S.CompactImage source={{ uri: restaurant.photos[0] }} />
      )}

      <Text variant="caption" numberOfLines={3}>
        {restaurant.name}
      </Text>
    </S.Item>
  );
};

export default CompactRestaurantInfo;
