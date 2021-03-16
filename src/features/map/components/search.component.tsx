import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';

import { useLocation } from 'services/location/location.context';

const SearchContainer = styled.View`
  padding: ${props => props.theme.space[3]};
  position: absolute;
  z-index: 999;
  top: 40px;
  width: 100%;
`;

const Search = (): JSX.Element => {
  const { keyword, search } = useLocation();
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);
  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        icon="map"
        value={searchKeyword}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={text => {
          setSearchKeyword(text);
        }}
      />
    </SearchContainer>
  );
};

export default Search;
