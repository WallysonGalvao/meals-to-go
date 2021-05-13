import React, { useState, createContext, useEffect, useContext } from 'react';
import { RestaurantProps } from './types';
import {
  restaurantsRequest,
  restaurantsTransform,
} from './restaurants.service';
import { useLocation } from '../location/location.context';

type RestaurantsContextData = {
  restaurants: RestaurantProps[];
  isLoading: boolean;
  error: string;
};

type Props = {
  children: React.ReactNode;
};

const RestaurantsContext = createContext<RestaurantsContextData>(
  {} as RestaurantsContextData,
);

export const RestaurantsProvider = ({ children }: Props): JSX.Element => {
  const [restaurants, setRestaurants] = useState<RestaurantProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { location } = useLocation();

  const retrieveRestaurants = (loc: string) => {
    setIsLoading(true);
    setRestaurants([]);

    restaurantsRequest(loc)
      .then(restaurantsTransform)
      .then(results => {
        setError('');
        setIsLoading(false);
        setRestaurants(results);
      })
      .catch(err => {
        setRestaurants([]);
        setIsLoading(false);
        setError(err);
      });
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

export function useRestaurants(): RestaurantsContextData {
  const context = useContext(RestaurantsContext);

  if (!context)
    throw new Error(
      'useRestaurants must be used within an RestaurantsProvider',
    );

  return context;
}
