import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'infrastructure/navigation/restaurants.navigator';
import { RestaurantsContext } from 'services/restaurants/restaurants.context';
import { MockParsedProps } from 'services/restaurants/mock';

import Spacer from 'components/spacer/spacer.component';
import SafeArea from 'components/utility/safe-area.components';
import RestaurantInfoCard from '../components/restaurant-info-card.component';
import Searchbar from '../components/search.component';

import * as S from './restaurants.styles';

type RestaurantsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Restaurants'
>;

type Props = {
  navigation: RestaurantsScreenNavigationProp;
};

const RestaurantsScreen = ({ navigation }: Props): JSX.Element => {
  const { restaurants, isLoading } = useContext(RestaurantsContext);

  const keyExtractor = (item: MockParsedProps) => item.placeId;

  const renderItem = ({ item }: { item: MockParsedProps }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('RestaurantDetail', { restaurant: item })
        }
      >
        <Spacer position="bottom" size="large">
          <RestaurantInfoCard {...item} />
        </Spacer>
      </TouchableOpacity>
    );
  };
  return (
    <SafeArea>
      {isLoading && (
        <S.LoadingContainer>
          <S.Loading size={50} />
        </S.LoadingContainer>
      )}
      <Searchbar />
      <S.RestaurantList
        data={restaurants}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </SafeArea>
  );
};

export default RestaurantsScreen;
