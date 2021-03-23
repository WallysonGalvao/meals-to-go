import React, { useState } from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import { RootStackParamList } from 'infrastructure/navigation/account.navigator';
import { useAuth } from 'services/authentication/authentication.context';

import Text from 'components/typography/text.component';
import Spacer from 'components/spacer/spacer.component';

import * as S from '../components/account.styles';

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Main'
>;

type RegisterScreenProps = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen = ({ navigation }: RegisterScreenProps): JSX.Element => {
  const { onRegister, error, isLoading } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');

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
          onChangeText={setEmail}
        />
        <Spacer size="large">
          <S.AuthInput
            label="Password"
            value={password}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={setPassword}
          />
        </Spacer>
        <Spacer size="large">
          <S.AuthInput
            label="Repeat Password"
            value={repeatedPassword}
            textContentType="password"
            secureTextEntry
            autoCapitalize="none"
            onChangeText={setRepeatedPassword}
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
              icon="email"
              mode="contained"
              onPress={() => onRegister(email, password, repeatedPassword)}
            >
              Register
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

export default RegisterScreen;
