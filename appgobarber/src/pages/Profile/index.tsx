import React, { useCallback, useRef } from 'react';
import {
  ScrollView, KeyboardAvoidingView, Platform, View, TextInput, Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';
import Icon from 'react-native-vector-icons/Feather';
// import ImagePicker from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';


import api from '../../services/api';
import { useAuth } from '../../hooks/Auth';

//components
import Input from '../../components/Input';
import Button from '../../components/Button';

import notAvatar from '../../assets/notAvatar.png';

import { Container, Title, UserAvatarButton, UserAvatar, BackButton } from './styles';

const Profile: React.FC = () => {
  const navigation = useNavigation();

  const { user, updateUser } = useAuth();

  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null)
  const passwordInputRef = useRef<TextInput>(null)
  const oldPasswordInputRef = useRef<TextInput>(null)
  const confirmPasswordInputRef = useRef<TextInput>(null)

  interface ProfileFormData {
    name: string;
    email: string;
    password: string;
    old_password: string;
    password_confirmation: string;
  }

  const handleSignUp = useCallback(async (data: ProfileFormData) => {
    try {
      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        old_password: Yup.string(),
        password: Yup.string().when('old_password', {
          is: (val) => !!val.length,
          then: Yup.string()
            .min(6, 'No mínimo 6 digitos')
            .required('Campo obrigatório'),
          otherwise: Yup.string(),
        }),
        password_confirmation: Yup.string()
          .when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string()
              .min(6, 'No mínimo 6 digitos')
              .required('Campo obrigatório'),
            otherwise: Yup.string(),
          })
          .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
      });
      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        email,
        name,
        old_password,
        password,
        password_confirmation,
      } = data;

      const formData = {
        name,
        email,
        ...(old_password
          ? {
            old_password,
            password,
            password_confirmation,
          }
          : {}),
      };

      const response = await api.put('/profile', formData);

      updateUser(response.data);

      Alert.alert('Perfil atualizado com sucesso');

      navigation.goBack();

    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
        return;
      }
      Alert.alert(
        'Erro na atualização do perfil',
        'Ocorreu um erro ao atualizar o perfil, tente novamente'
      );
    }
  },
    [navigation, updateUser]
  );

  const handleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.launchCamera({
    }, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Erro ao atualizar seu avatar', response.errorCode);
        return;
      }

      const data = new FormData();

      data.append('avatar', {
        type: 'image/jpeg',
        name: `${user.id}.jpg`,
        uri: response.uri,
      });

      api.patch('users/avatar', data).then(response => {
        updateUser(response.data);
      });

    });
  }, [updateUser, user.id]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>

            <BackButton onPress={handleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            <UserAvatarButton onPress={handleUpdateAvatar}>
              {user.avatar_url
                ? <UserAvatar source={{ uri: user.avatar_url }} />
                : <UserAvatar source={notAvatar} />
              }
            </UserAvatarButton>

            <View>
              <Title>Meu Perfil</Title>
            </View>
            <Form
              initialData={user}
              style={{ width: '100%' }}
              ref={formRef}
              onSubmit={handleSignUp}>
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType='next'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />
              <Input
                ref={emailInputRef}
                keyboardType="email-address"
                autoCorrect={false}
                autoCapitalize="none"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType='next'
                onSubmitEditing={() => {
                  oldPasswordInputRef.current?.focus();
                }}
              />
              <Input
                ref={oldPasswordInputRef}
                secureTextEntry={true}
                textContentType="newPassword"
                name="old_password"
                icon="lock"
                placeholder="Senha Atual"
                returnKeyType='next'
                containerStyle={{ marginTop: 16 }}
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry={true}
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="Nova Senha"
                returnKeyType='next'
                onSubmitEditing={() => {
                  confirmPasswordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry={true}
                textContentType="newPassword"
                name="password_confirmation"
                icon="lock"
                placeholder="confirmar Senha"
                returnKeyType='send'
                onSubmitEditing={() => formRef.current?.submitForm()}
              />

              <Button onPress={() => formRef.current?.submitForm()} > Confirmar Mudanças</Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

export default Profile;