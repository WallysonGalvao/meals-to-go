import styled, { css } from 'styled-components/native';

export const SearchContainer = styled.View`
  ${({ theme }) => css`
    padding: ${theme.space[3]};
  `}
`;
