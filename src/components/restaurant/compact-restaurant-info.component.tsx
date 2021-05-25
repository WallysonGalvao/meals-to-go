import React from 'react';
import { Platform } from 'react-native';

import { RestaurantProps } from 'services/restaurants/types';

import Text from '../typography/text.component';

import * as S from './compact-restaurant-info.styles';

type CompactRestaurantInfoProps = {
  restaurant: RestaurantProps;
  isMap?: boolean;
};

const isAndroid = Platform.OS === 'android';

const CompactRestaurantInfo = ({
  restaurant,
  isMap,
}: CompactRestaurantInfoProps): JSX.Element => {
  return (
    <S.Item>
      {isAndroid && isMap ? (
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
