import React, { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import {
  useAuth,
  UserProps,
} from 'services/authentication/authentication.context';
import { RootStackParamList } from 'infrastructure/navigation/settings.navigator';

import SafeArea from 'components/utility/safe-area.components';
import Text from 'components/typography/text.component';
import Spacer from 'components/spacer/spacer.component';

import * as S from './settings.styles';

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Settings'
>;

type SettingsScreenProps = {
  navigation: SettingsScreenNavigationProp;
};

const SettingsScreen = ({ navigation }: SettingsScreenProps): JSX.Element => {
  const { user, onLogout } = useAuth();
  const [photo, setPhoto] = useState('');

  const getProfilePicture = async (currentUser: UserProps) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser.uid}-photo`);
    if (photoUri) setPhoto(photoUri);
  };

  useFocusEffect(
    useCallback(() => {
      getProfilePicture(user);
    }, [user]),
  );

  return (
    <SafeArea>
      <S.AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          {!photo && (
            <Avatar.Icon
              size={180}
              icon="human"
              style={{ backgroundColor: '#2182BD' }}
            />
          )}
          {!!photo && (
            <Avatar.Image
              size={180}
              source={{ uri: photo }}
              style={{ backgroundColor: '#2182BD' }}
            />
          )}
        </TouchableOpacity>
        <Spacer position="top" size="large">
          <Text variant="label">{user.email}</Text>
        </Spacer>
      </S.AvatarContainer>

      <List.Section>
        <S.SettingsItem
          title="Favourites"
          description="View your favourites"
          left={props => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate('Favourites')}
        />
        <S.SettingsItem
          title="Logout"
          left={props => <List.Icon {...props} color="black" icon="door" />}
          onPress={onLogout}
        />
      </List.Section>
    </SafeArea>
  );
};

export default SettingsScreen;
