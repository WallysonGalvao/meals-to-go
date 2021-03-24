import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'infrastructure/navigation/restaurants.navigator';
import { useRestaurants } from 'services/restaurants/restaurants.context';
import { RestaurantProps } from 'services/restaurants/mock';
import { useFavorite } from 'services/favourites/favourites.context';

import Spacer from 'components/spacer/spacer.component';
import SafeArea from 'components/utility/safe-area.components';
import FavouritesBar from 'components/favourites/favouriteBar';
import FadeInView from 'components/animations/fade.animation';
import RestaurantInfoCard from '../components/restaurant-info-card.component';
import Searchbar from '../components/search.component';

import * as S from './restaurants.styles';

type RestaurantsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Restaurants'
>;

type RestaurantsScreenProps = {
  navigation: RestaurantsScreenNavigationProp;
};

const RestaurantsScreen = ({
  navigation,
}: RestaurantsScreenProps): JSX.Element => {
  const { restaurants, isLoading } = useRestaurants();
  const { favourites } = useFavorite();

  const [isToggled, setIsToggled] = useState(false);

  const keyExtractor = (item: RestaurantProps) => item.placeId;

  const renderItem = ({ item: restaurant }: { item: RestaurantProps }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
      >
        <Spacer position="bottom" size="large">
          <FadeInView>
            <RestaurantInfoCard {...restaurant} />
          </FadeInView>
        </Spacer>
      </TouchableOpacity>
    );
  };

  return (
    <SafeArea>
      {isLoading && (
        <S.LoadingContainer>
          <S.Loading />
        </S.LoadingContainer>
      )}
      <Searchbar
        isFavouritesToggled={isToggled}
        onFavouritesToggle={() => setIsToggled(!isToggled)}
      />
      {isToggled && (
        <FavouritesBar
          favourites={favourites}
          onNavigate={navigation.navigate}
        />
      )}
      <S.RestaurantList
        data={restaurants}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </SafeArea>
  );
};

export default RestaurantsScreen;
