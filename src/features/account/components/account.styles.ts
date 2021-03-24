/* eslint-disable global-require */
import styled, { css } from 'styled-components/native';
import { Button, TextInput } from 'react-native-paper';
import Text from 'components/typography/text.component';

export const AccountBackground = styled.ImageBackground.attrs({
  source: require('../../../../assets/home_bg.jpg'),
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`;

export const AccountContainer = styled.View`
  ${({ theme }) => css`
    background-color: rgba(255, 255, 255, 0.7);
    padding: ${theme.space[4]};
    margin-top: ${theme.space[2]};
  `}
`;

export const AuthButton = styled(Button).attrs(({ theme }) => ({
  color: theme.colors.brand.primary,
}))`
  ${({ theme }) => css`
    padding: ${theme.space[2]};
  `}
`;

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const Title = styled(Text)`
  font-size: 30px;
`;

export const ErrorContainer = styled.View`
  ${({ theme }) => css`
    max-width: 300px;
    align-items: center;
    align-self: center;
    margin-top: ${theme.space[2]};
    margin-bottom: ${theme.space[2]};
  `}
`;

export const AnimationWrapper = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 40%;
    position: absolute;
    top: 30px;
    padding: ${theme.space[2]};
  `}
`;
