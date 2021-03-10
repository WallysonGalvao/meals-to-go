import React from 'react';
import { Text, Image, View } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Card } from 'react-native-paper';
import { SvgXml } from 'react-native-svg';

import star from '../../../../assets/star';
import open from '../../../../assets/open';

const RestaurantCard = styled(Card)`
  ${({ theme }) => css`
    background-color: ${theme.colors.bg.primary};
    /* padding: ${props => props.theme.space[3]}; */
  `}
`;

const RestaurantCardCover = styled(Card.Cover)`
  ${({ theme }) => css`
    padding: ${theme.space[3]};
    background-color: ${theme.colors.bg.primary};
  `}
`;

const Address = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.caption};
  `}
`;

const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.ui.primary};
    font-family: ${theme.fonts.heading};
    font-size: ${theme.fontSizes.body};
  `}
`;

const Info = styled.View`
  ${({ theme }) => css`
    padding: ${theme.space[3]};
  `}
`;

const Rating = styled.View`
  flex-direction: row;
  padding-top: ${props => props.theme.space[2]};
  padding-bottom: ${props => props.theme.space[2]};
`;

const Section = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SectionEnd = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-end;
`;

type RestaurantProps = {
  name: string;
  icon: string;
  photos: string[];
  address: string;
  isOpenNow: boolean;
  rating: number;
  isClosedTemporarily: boolean;
};

export const RestaurantInfoCard = ({
  name,
  icon,
  photos,
  address,
  isOpenNow,
  rating,
  isClosedTemporarily,
}: RestaurantProps): JSX.Element => {
  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RestaurantCard elevation={5}>
      <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <Title>{name}</Title>
        <Section>
          <Rating>
            {ratingArray.map((_, index) => (
              <SvgXml key={index} xml={star} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant="label" style={{ color: 'red' }}>
                CLOSED TEMPORARILY
              </Text>
            )}
            <View style={{ paddingLeft: 16 }} />
            {isOpenNow && <SvgXml xml={open} width={20} height={20} />}
            <View style={{ paddingLeft: 16 }} />
            <Image style={{ width: 15, height: 15 }} source={{ uri: icon }} />
          </SectionEnd>
        </Section>

        <Address>{address}</Address>
      </Info>
    </RestaurantCard>
  );
};
