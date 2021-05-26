import React, { useState, useEffect } from 'react';
import { Marker, Callout } from 'react-native-maps';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { StackNavigationProp } from '@react-navigation/stack';

import { useLocation } from 'services/location/location.context';
import { useRestaurants } from 'services/restaurants/restaurants.context';

import { RootBottomParamList } from 'infrastructure/navigation/app.navigator';
import { RootStackParamList } from 'infrastructure/navigation/restaurants.navigator';

import Search from '../components/search.component';
import MapCallout from '../components/map-callout.component';

import * as S from './map.styles';

type MapScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<RootBottomParamList, 'Map'>,
  StackNavigationProp<RootStackParamList>
>;

type Props = {
  navigation: MapScreenNavigationProp;
};

const RestaurantMap = ({ navigation }: Props): JSX.Element => {
  const { location } = useLocation();
  const { restaurants = [] } = useRestaurants();

  const [latDelta, setLatDelta] = useState(0);

  const { lat, lng, viewport } = location;

  useEffect(() => {
    const northeastLat = viewport.northeast.lat;
    const southwestLat = viewport.southwest.lat;

    setLatDelta(northeastLat - southwestLat);
  }, [location, viewport]);

  return (
    <>
      <Search />
      <S.Map
        region={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: latDelta,
          longitudeDelta: 0.01,
        }}
      >
        {restaurants.map(restaurant => {
          return (
            <Marker
              key={restaurant.name}
              title={restaurant.name}
              coordinate={{
                latitude: restaurant.geometry.location.lat,
                longitude: restaurant.geometry.location.lng,
              }}
            >
              <Callout
                onPress={() =>
                  navigation.navigate('RestaurantDetail', {
                    restaurant,
                  })
                }
              >
                <MapCallout restaurant={restaurant} />
              </Callout>
            </Marker>
          );
        })}
      </S.Map>
    </>
  );
};

const MapScreen = ({ navigation }: Props): JSX.Element => {
  const { location } = useLocation();
  if (!location) {
    return (
      <S.Map
        region={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0.02,
        }}
      />
    );
  }
  return <RestaurantMap navigation={navigation} />;
};

export default MapScreen;
