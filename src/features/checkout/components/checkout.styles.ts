import styled, { css } from 'styled-components/native';
import {
  Avatar,
  TextInput,
  Button,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';

export const CartIconContainer = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
export const CartIcon = styled(Avatar.Icon).attrs({
  size: 128,
})`
  ${({ theme, bg }) => css`
    background-color: ${bg || theme.colors.brand.primary};
  `}
`;

export const NameInput = styled(TextInput)`
  ${({ theme }) => css`
    margin: ${theme.space[3]};
  `}
`;

export const PayButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.brand.primary,
}))`
  ${({ theme }) => css`
    width: 80%;
    align-self: center;
    padding: ${theme.space[2]};
  `}
`;
export const ClearButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.ui.error,
}))`
  ${({ theme }) => css`
    width: 80%;
    align-self: center;
    padding: ${theme.space[2]};
  `}
`;

export const PaymentProcessing = styled(ActivityIndicator).attrs({
  size: 128,
  animating: true,
  color: Colors.blue300,
})`
  position: absolute;
  top: 50%;
  left: 35%;
  z-index: 999;
`;
