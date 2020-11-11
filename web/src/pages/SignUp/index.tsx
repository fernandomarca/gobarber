import React from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import { Container, Content, Background } from './styles';

import logoImg from '../../assets/images/logo.svg';

// components
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => (
  <>
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <form>
          <h1>Faça seu cadastro</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" />

          <Input icon={FiMail} name="email" placeholder="E-mail" />

          <Input
            icon={FiLock}
            name="senha"
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </form>

        <Link to="/">
          <FiArrowLeft />
          Voltar para o Logon
        </Link>
      </Content>
    </Container>
  </>
);

export default SignUp;
