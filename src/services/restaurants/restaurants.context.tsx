import React, { useState, createContext, useEffect } from 'react';
import { MockParsedProps } from './mock';
import {
  restaurantsRequest,
  restaurantsTransform,
} from './restaurants.service';

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
  const [error, setError] = useState(null);

  const retrieveRestaurants = () => {
    setIsLoading(true);
    setTimeout(() => {
      restaurantsRequest()
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
    retrieveRestaurants();
  }, []);

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
