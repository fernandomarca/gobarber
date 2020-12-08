import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLock } from 'react-icons/fi';
import { useHistory, useLocation } from 'react-router-dom';
import { useToast } from '../../hooks/ToastContext';

import { Container, Content, AnimationContainer, Background } from './styles';

import logoImg from '../../assets/images/logo.svg';

// components
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

interface ResetPasswordFormData {
  password: string;
  password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const history = useHistory();

  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const location = useLocation();

  const handleSubmit = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          password: Yup.string().required('A senha é obrigatória'),
          password_confirmation: Yup.string().oneOf(
            [Yup.ref('password'), undefined],
            'Confirmação incorreta',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        const { password, password_confirmation } = data;
        const token = location.search.replace('?token=', '');

        if (!token) {
          throw new Error();
        }

        await api.post('/password/reset', {
          password,
          password_confirmation,
          token,
        });

        addToast({
          type: 'success',
          title: 'sua senha foi resetada',
        });

        history.push('/');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro ao resetar senha',
          description: 'Ocorreu um erro ao resetar sua senha, tente novamente',
        });
      }
    },
    [addToast, history, location.search],
  );
  return (
    <>
      <Container>
        <AnimationContainer>
          <Content>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Resetar senha</h1>

              <Input
                icon={FiLock}
                name="password"
                type="password"
                placeholder="Nova senha"
              />

              <Input
                icon={FiLock}
                name="password_confirmation"
                type="password"
                placeholder="Confirmar da senha"
              />

              <Button type="submit">Entrar</Button>
            </Form>
          </Content>
        </AnimationContainer>
        <Background />
      </Container>
    </>
  );
};

export default ResetPassword;
