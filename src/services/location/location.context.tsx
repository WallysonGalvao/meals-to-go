import React, { useState, useEffect, createContext, useContext } from 'react';

import {
  locationRequest,
  locationTransform,
  LocationProps,
} from './location.service';

interface LocationContextData {
  location: LocationProps;
  isLoading: boolean;
  error: string;
  search: (searchKeyword: string) => void;
  keyword: string;
}

type Props = {
  children: React.ReactNode;
};

const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData,
);

export const LocationProvider = ({ children }: Props): JSX.Element => {
  const [keyword, setKeyword] = useState('San Francisco');
  const [location, setLocation] = useState<LocationProps>({} as LocationProps);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
  };

  useEffect(() => {
    if (!keyword.length) {
      // don't do anything
      return;
    }
    locationRequest(keyword.toLowerCase())
      .then(locationTransform)
      .then(result => {
        setError('');
        setIsLoading(false);
        setLocation(result);
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }, [keyword]);

  return (
    <LocationContext.Provider
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export function useLocation(): LocationContextData {
  const context = useContext(LocationContext);

  if (!context)
    throw new Error('useLocation must be used within an LocationProvider');

  return context;
}
