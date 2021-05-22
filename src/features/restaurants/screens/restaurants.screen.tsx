import React, { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'infrastructure/navigation/restaurants.navigator';
import { RestaurantProps } from 'services/restaurants/types';
import { useRestaurants } from 'services/restaurants/restaurants.context';
import { useLocation } from 'services/location/location.context';
import { useFavorite } from 'services/favourites/favourites.context';

import Spacer from 'components/spacer/spacer.component';
import Text from 'components/typography/text.component';
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
  const { error: locationError } = useLocation();
  const { restaurants, isLoading, error } = useRestaurants();
  const { favourites } = useFavorite();

  const [isToggled, setIsToggled] = useState(false);

  const hasError = useMemo(() => {
    return !!error || !!locationError;
  }, [error, locationError]);

  const keyExtractor = (item: RestaurantProps) => item.placeId;

  const renderItem = ({ item: restaurant }: { item: RestaurantProps }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('RestaurantDetail', { restaurant })}
      >
        <Spacer position="bottom" size="large">
          <FadeInView>
            <RestaurantInfoCard restaurant={restaurant} />
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
      {hasError && (
        <Spacer position="left" size="large">
          <Text variant="error">Something went wrong retrieving the data</Text>
        </Spacer>
      )}
      {!hasError && (
        <S.RestaurantList
          data={restaurants}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      )}
    </SafeArea>
  );
};

export default RestaurantsScreen;
