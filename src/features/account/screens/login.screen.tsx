import React, { useCallback, useState } from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'infrastructure/navigation/account.navigator';
import { useAuth } from 'services/authentication/authentication.context';

import Text from 'components/typography/text.component';
import Spacer from 'components/spacer/spacer.component';

import * as S from '../components/account.styles';

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Login'
>;

type LoginScreenProps = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation }: LoginScreenProps): JSX.Element => {
  const { onLogin, error, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(() => {
    onLogin(email, password);
  }, [email, password, onLogin]);

  return (
    <S.AccountBackground>
      <S.AccountCover />
      <S.Title>Meals To Go</S.Title>
      <S.AccountContainer>
        <S.AuthInput
          label="E-mail"
          value={email}
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={u => setEmail(u)}
        />
        <Spacer size="large">
          <S.AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={p => setPassword(p)}
          />
        </Spacer>
        {!!error && (
          <S.ErrorContainer>
            <Text variant="error">{error}</Text>
          </S.ErrorContainer>
        )}
        <Spacer size="large">
          {!isLoading ? (
            <S.AuthButton
              icon="lock-open-outline"
              mode="contained"
              onPress={handleLogin}
            >
              Login
            </S.AuthButton>
          ) : (
            <ActivityIndicator animating color={Colors.blue300} />
          )}
        </Spacer>
      </S.AccountContainer>
      <Spacer size="large">
        <S.AuthButton mode="contained" onPress={() => navigation.goBack()}>
          Back
        </S.AuthButton>
      </Spacer>
    </S.AccountBackground>
  );
};

export default LoginScreen;
