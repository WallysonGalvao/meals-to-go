import React, { useState, useEffect, createContext } from 'react';

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

export const LocationContext = createContext<LocationContextData>(
  {} as LocationContextData,
);

const LocationContextProvider = ({ children }: Props): JSX.Element => {
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

export default LocationContextProvider;
