import React from 'react';
import { List, Avatar } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAuth } from 'services/authentication/authentication.context';
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

  return (
    <SafeArea>
      <S.AvatarContainer>
        <Avatar.Icon size={180} icon="human" backgroundColor="#2182BD" />
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
