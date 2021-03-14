import React from 'react';
import { Image } from 'react-native';
import { SvgXml } from 'react-native-svg';

import { Spacer } from 'components/spacer/spacer.component';
import { Text } from 'components/typography/text.component';

import star from '../../../../assets/star';
import open from '../../../../assets/open';

import * as S from './restaurant-info-card.styles';

export type RestaurantInfoCardProps = {
  id: number;
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
};

const RestaurantInfoCard = ({
  name,
  icon,
  photos,
  address,
  isOpenNow,
  rating,
  isClosedTemporarily,
}: RestaurantInfoCardProps): JSX.Element => {
  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <S.RestaurantCard elevation={5}>
      <S.RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <S.Info>
        <Text variant="label">{name}</Text>
        <S.Section>
          <S.Rating>
            {ratingArray.map((_, index) => (
              <SvgXml key={index} xml={star} width={20} height={20} />
            ))}
          </S.Rating>
          <S.SectionEnd>
            {isClosedTemporarily && (
              <Text variant="error">CLOSED TEMPORARILY</Text>
            )}
            <Spacer position="left" size="large">
              {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            </Spacer>
            <Spacer position="left" size="large">
              <Image style={{ width: 15, height: 15 }} source={{ uri: icon }} />
            </Spacer>
          </S.SectionEnd>
        </S.Section>

        <S.Address>{address}</S.Address>
      </S.Info>
    </S.RestaurantCard>
  );
};

export default RestaurantInfoCard;
