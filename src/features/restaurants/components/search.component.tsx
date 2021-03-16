import React, { useState, useEffect } from 'react';
import { Searchbar } from 'react-native-paper';

import { useLocation } from '../../../services/location/location.context';

import * as S from './search.styles';

type SearchProps = {
  isFavouritesToggled: boolean;
  onFavouritesToggle: () => void;
};

const Search = ({
  isFavouritesToggled,
  onFavouritesToggle,
}: SearchProps): JSX.Element => {
  const { keyword, search } = useLocation();
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <S.SearchContainer>
      <Searchbar
        icon={isFavouritesToggled ? 'heart' : 'heart-outline'}
        onIconPress={onFavouritesToggle}
        placeholder="Search for a location"
        value={searchKeyword}
        onSubmitEditing={() => search(searchKeyword)}
        onChangeText={setSearchKeyword}
      />
    </S.SearchContainer>
  );
};

export default Search;
