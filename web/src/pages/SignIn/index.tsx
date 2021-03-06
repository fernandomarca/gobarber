import React, { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthContext';
import { useToast } from '../../hooks/ToastContext';

import { Container, Content, AnimationContainer, Background } from './styles';

import logoImg from '../../assets/images/logo.svg';

// components
import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { signIn } = useAuth();

  const { addToast } = useToast();

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('O email é obrigatório'),
          password: Yup.string().required('A senha é obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Algo deu errado',
          description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
        });
      }
    },
    [signIn, addToast, history],
  );
  return (
    <>
      <Container>
        <AnimationContainer>
          <Content>
            <img src={logoImg} alt="GoBarber" />

            <Form ref={formRef} onSubmit={handleSubmit}>
              <h1>Faça seu logon</h1>

              <Input
                icon={FiMail}
                type="text"
                name="email"
                placeholder="E-mail"
              />

              <Input
                icon={FiLock}
                name="password"
                type="password"
                placeholder="Senha"
              />

              <Button type="submit">Entrar</Button>

              <Link to="forgot-password">Esqueci minha senha</Link>
            </Form>
          </Content>
          <Link to="/signup">
            <FiLogIn />
            Criar conta
          </Link>
        </AnimationContainer>
        <Background />
      </Container>
    </>
  );
};

export default SignIn;
