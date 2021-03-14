import React, { useContext, useState } from 'react';
import { Searchbar } from 'react-native-paper';

import { LocationContext } from '../../../services/location/location.context';

import * as S from './search.styles';

const Search = (): JSX.Element => {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  return (
    <S.SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => search(searchKeyword)}
        onChangeText={setSearchKeyword}
      />
    </S.SearchContainer>
  );
};

export default Search;
