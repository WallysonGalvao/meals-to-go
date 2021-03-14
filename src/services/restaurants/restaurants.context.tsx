import React, { useState, createContext, useEffect, useContext } from 'react';
import { MockParsedProps } from './mock';
import {
  restaurantsRequest,
  restaurantsTransform,
} from './restaurants.service';
import { LocationContext } from '../location/location.context';

type RestaurantsContextData = {
  restaurants: MockParsedProps[];
  isLoading: boolean;
  error: string;
};

type Props = {
  children: React.ReactNode;
};

export const RestaurantsContext = createContext<RestaurantsContextData>(
  {} as RestaurantsContextData,
);

const RestaurantsContextProvider = ({ children }: Props): JSX.Element => {
  const [restaurants, setRestaurants] = useState<MockParsedProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { location } = useContext(LocationContext);

  const retrieveRestaurants = (loc: string) => {
    setIsLoading(true);
    setRestaurants([]);

    setTimeout(() => {
      restaurantsRequest(loc)
        .then(restaurantsTransform)
        .then(results => {
          setIsLoading(false);
          setRestaurants(results);
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        });
    }, 2000);
  };

  useEffect(() => {
    if (location) {
      const locationString = `${location.lat},${location.lng}`;
      retrieveRestaurants(locationString);
    }
  }, [location]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        isLoading,
        error,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContextProvider;
