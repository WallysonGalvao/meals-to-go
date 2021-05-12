import camelize from 'camelize';
import { host, isMock } from '../../utils/env';
import { MockProps, RestaurantProps } from './types';

export const restaurantsRequest = async (
  location: string,
): Promise<MockProps> => {
  const url = `${host}/placesNearby?location=${location}&mock=${isMock}`;
  const res = await fetch(url);
  return res.json();
};

export const restaurantsTransform = ({
  results = [],
}: MockProps): Array<RestaurantProps> => {
  const mappedResults = results.map(restaurant => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return camelize(mappedResults);
};
