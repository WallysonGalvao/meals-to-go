import styled, { css } from 'styled-components/native';
import { List } from 'react-native-paper';

export const SettingsItem = styled(List.Item)`
  ${({ theme }) => css`
    padding: ${theme.space[3]};
  `}
`;
export const AvatarContainer = styled.View`
  align-items: center;
`;
