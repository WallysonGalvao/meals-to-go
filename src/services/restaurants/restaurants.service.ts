import camelize from 'camelize';
import {
  mocks,
  mockImages,
  MockProps,
  MockParsedProps,
  MocksLocations,
} from './mock';

export const restaurantsRequest = (location: string): Promise<MockProps> => {
  return new Promise((resolve, reject) => {
    const mock = mocks[location as MocksLocations];
    if (!mock) reject(new Error('not found'));
    resolve(mock);
  });
};

export const restaurantsTransform = ({
  results = [],
}: MockProps): Array<MockParsedProps> => {
  const mappedResults = results.map(restaurant => {
    const restaurantSelf = restaurant;
    restaurantSelf.photos = restaurant.photos.map(() => {
      return mockImages[Math.ceil(Math.random() * (mockImages.length - 1))];
    });

    return {
      ...restaurantSelf,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === 'CLOSED_TEMPORARILY',
    };
  });

  return camelize(mappedResults);
};
