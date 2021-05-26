import React from 'react';
import { View, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';

import Spacer from 'components/spacer/spacer.component';
import Text from 'components/typography/text.component';
import Favourite from 'components/favourites/favourite.component';

import { RestaurantProps } from 'services/restaurants/types';

import star from '../../../../assets/star';
import open from '../../../../assets/open';

import * as S from './restaurant-info-card.styles';

type RestaurantInfoCardProps = {
  restaurant: RestaurantProps;
};

const RestaurantInfoCard = ({
  restaurant,
}: RestaurantInfoCardProps): JSX.Element => {
  const {
    placeId,
    name,
    photos,
    rating = 0,
    isClosedTemporarily,
    isOpenNow,
    businessStatus,
    ix,
    icon,
    address,
  } = restaurant;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <S.RestaurantCard elevation={2}>
      <View>
        <Favourite restaurant={restaurant} />
        <S.RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      </View>
      <S.Info>
        <Text variant="label">{name}</Text>
        <S.Section>
          <S.Rating>
            {ratingArray.map((_, index) => (
              <SvgXml
                key={`star-${placeId + index}`}
                xml={star}
                width={20}
                height={20}
              />
            ))}
          </S.Rating>
          <S.SectionEnd>
            {isClosedTemporarily ? (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            ) : (
              <Text variant="body">{businessStatus}</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Image
                style={{ width: 15, height: 15 }}
                source={{ uri: ix || icon }}
              />
            </Spacer>
          </S.SectionEnd>
        </S.Section>

        <S.Address>{address}</S.Address>
      </S.Info>
    </S.RestaurantCard>
  );
};

export default RestaurantInfoCard;
