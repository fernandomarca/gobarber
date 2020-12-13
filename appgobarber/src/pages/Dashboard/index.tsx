import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import React, { useCallback, useEffect, useState } from 'react';

import { useAuth } from '../../hooks/Auth';
import api from '../../services/api';

import notAvatar from '../../assets/notAvatar.png';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  ProviderList,
  ProviderContainer,
  ProviderAvatar,
  ProviderInfo,
  ProviderName,
  ProviderMeta,
  ProviderMetaText,
  ProvidersListTitle
} from './styles';
export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

const dashboard: React.FC = () => {
  const [providers, setProviders] = useState<Provider[]>([]);

  const { user } = useAuth();

  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment', { providerId });
  }, [navigate]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          {user.avatar_url
            ? <UserAvatar source={{ uri: user.avatar_url }} />
            : <UserAvatar source={notAvatar} />
          }
        </ProfileButton>
      </Header>

      <ProviderList
        data={providers}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={
          <ProvidersListTitle>Cabeleireiros</ProvidersListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => navigateToCreateAppointment(provider.id)}>
            {user.avatar_url
              ? <UserAvatar source={{ uri: user.avatar_url }} />
              : <UserAvatar source={notAvatar} />
            }
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>

              <ProviderMeta>
                <Icon name="calendar" size={14} color="#ff9000" />
                <ProviderMetaText>Segunda `a Sexta</ProviderMetaText>
              </ProviderMeta>

              <ProviderMeta>
                <Icon name="clock" size={14} color="#ff9000" />
                <ProviderMetaText>8h `as 18h</ProviderMetaText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )}
      ></ProviderList>
    </Container>
  )
}

export default dashboard;