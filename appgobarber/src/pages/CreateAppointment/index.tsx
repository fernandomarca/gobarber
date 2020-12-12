import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/Auth';
import DateTimePicker from '@react-native-community/datetimepicker';
import api from '../../services/api';

import {
  Container,
  UserAvatar,
  Header,
  HeaderTitle,
  BackButton,
  ProviderListContainer,
  ProviderList,
  ProviderContainer,
  ProviderAvatar,
  ProviderName,
  Title,
  Calendar,
  OpenDatePickerButton,
  OpenDatePickerButtonText,
  Schedule,
  Section,
  SectionTitle,
  SectionContent,
  Hour,
  HourText,
  Content,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
} from './styles';
import { Alert, Platform } from 'react-native';
import { format } from 'date-fns';

interface RouteParams {
  providerId: string;
}
export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface AvailabilityItem {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();

  const { goBack, navigate } = useNavigation();

  const routeParams = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(routeParams.providerId);

  const handleSelectProvider = useCallback((providerId: string) => {
    setSelectedProvider(providerId);
  }, []);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const handletoggleDatePicker = useCallback(() => {
    setShowDatePicker(!showDatePicker);
  }, [showDatePicker])

  useEffect(() => {
    api.get('providers').then(response => {
      setProviders(response.data);
    });
  }, []);

  const navigateBackToDashboard = useCallback(() => {
    goBack();
  }, [goBack]);

  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChanged = useCallback((event: any, date: Date | undefined) => {
    if (Platform.OS == 'android') {
      setShowDatePicker(false);
    }

    if (date) {
      setSelectedDate(date);
    }

  }, []);

  const [availability, setAvailability] = useState<AvailabilityItem[]>([])

  useEffect(() => {
    api.get(`providers/${selectedProvider}/day-availability`, {
      params: {
        year: selectedDate.getFullYear(),
        month: selectedDate.getMonth() + 1,
        day: selectedDate.getDate(),
      }
    }).then(response => {
      setAvailability(response.data);
    });
  }, [selectedDate, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      });
  }, [availability]);

  const afternoonAvailability = useMemo(() => {
    return availability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => {
        return {
          hour,
          available,
          hourFormatted: format(new Date().setHours(hour), 'HH:00'),
        }
      });
  }, [availability]);

  const [selectedHour, setSelectedHour] = useState(0);

  const handleSelectHour = useCallback((hour: number, available: boolean) => {
    if (available) {
      setSelectedHour(hour);
    }
  }, []);

  const handleCreateAppoint = useCallback(async () => {
    try {
      const date = new Date(selectedDate);

      date.setHours(selectedHour);
      date.setMinutes(0);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date,
      });

      navigate('AppointmentCreated', { date: date.getTime() })
    } catch (error) {
      Alert.alert(
        'Erro ao criar o agendamento',
        'Ocorreu um erro ao criar o agendamento, tente novamente'
      )
    }

  }, [navigate, selectedDate, selectedHour, selectedProvider]);
  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBackToDashboard}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>

        <HeaderTitle>Cabeleireiros</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <Content>
        <ProviderListContainer>
          <ProviderList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={providers}
            keyExtractor={provider => provider.id}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                onPress={() => handleSelectProvider(provider.id)}
                selected={provider.id === selectedProvider}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName
                  selected={provider.id === selectedProvider}
                >{provider.name}</ProviderName>
              </ProviderContainer>

            )}
          >
          </ProviderList>
        </ProviderListContainer>

        <Calendar>
          <Title>Escolha a data</Title>

          <OpenDatePickerButton onPress={handletoggleDatePicker}>
            <OpenDatePickerButtonText>Selecionar outra data</OpenDatePickerButtonText>
          </OpenDatePickerButton>

          {showDatePicker && <DateTimePicker
            display="calendar"
            onChange={handleDateChanged}
            mode="date"
            value={selectedDate}
            textColor="#f4ede8"
          />}
        </Calendar>

        <Schedule>
          <Title>Escolha o horário</Title>

          <Section>
            <SectionTitle>Manhã</SectionTitle>

            <SectionContent>
              {morningAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  onPress={() => handleSelectHour(hour, available)}
                  available={available}
                  key={hourFormatted}>
                  <HourText
                    selected={selectedHour === hour}
                  >{hourFormatted}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>

          <Section>
            <SectionTitle>Tarde</SectionTitle>

            <SectionContent>
              {afternoonAvailability.map(({ hourFormatted, hour, available }) => (
                <Hour
                  enabled={available}
                  selected={selectedHour === hour}
                  onPress={() => handleSelectHour(hour, available)}
                  available={available}
                  key={hourFormatted}>
                  <HourText
                    selected={selectedHour === hour}
                  >{hourFormatted}</HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppoint}>
          <CreateAppointmentButtonText>Agendar</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Content>

    </Container>
  )
}

export default CreateAppointment;