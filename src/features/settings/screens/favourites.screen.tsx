import React from 'react';
import { TouchableOpacity } from 'react-native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useFavorite } from 'services/favourites/favourites.context';
import { RestaurantProps } from 'services/restaurants/types';
import { RootStackParamList as RestaurantsStackParamList } from 'infrastructure/navigation/restaurants.navigator';
import { RootStackParamList as SettingsStackParamList } from 'infrastructure/navigation/settings.navigator';

import SafeArea from 'components/utility/safe-area.components';
import Text from 'components/typography/text.component';
import Spacer from 'components/spacer/spacer.component';

import RestaurantInfoCard from '../../restaurants/components/restaurant-info-card.component';

import * as S from './favourites.styles';

type Favorites = RestaurantProps;

type FavouritesScreenNavigationProp = CompositeNavigationProp<
  StackNavigationProp<SettingsStackParamList, 'Favourites'>,
  StackNavigationProp<RestaurantsStackParamList>
>;

type FavouritesScreenProps = {
  navigation: FavouritesScreenNavigationProp;
};

const FavouritesScreen = ({
  navigation,
}: FavouritesScreenProps): JSX.Element => {
  const { favourites } = useFavorite();

  const keyExtractor = (item: Favorites) => item.name;

  const renderItem = ({ item: restaurant }: { item: Favorites }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RestaurantDetail', {
            restaurant,
          })
        }
      >
        <Spacer position="bottom" size="large">
          <RestaurantInfoCard restaurant={restaurant} />
        </Spacer>
      </TouchableOpacity>
    );
  };

  return favourites.length ? (
    <SafeArea>
      <S.RestaurantList
        data={favourites}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </SafeArea>
  ) : (
    <S.NoFavouritesArea>
      <Text variant="label">No favourites yet</Text>
    </S.NoFavouritesArea>
  );
};

export default FavouritesScreen;
