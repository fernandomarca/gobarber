import React, { useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import getValidationErrors from '../../utils/getValidationErrors';
import inputValidation from '../../utils/inputValidation';

import { Container, Content, Background } from './styles';

import logoImg from '../../assets/images/logo.svg';

// components
import Input from '../../components/Input';
import Button from '../../components/Button';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback((data) => {
    // console.log(data);
    inputValidation({ formRef, data });
    // try {
    //   const schema = Yup.object().shape({
    //     name: Yup.string().required('Nome obrigatório'),
    //     email: Yup.string()
    //       .required('E-mail obrigatório')
    //       .email('Digite um e-mail válido'),
    //     password: Yup.string().min(6, 'No mínimo 6 digitos'),
    //   });
    //   await schema.validate(data, {
    //     abortEarly: false,
    //   });
    // } catch (err) {
    //   const errors = getValidationErrors(err);
    //   formRef.current?.setErrors(errors);
    // }
  }, []);

  return (
    <Container>
      <Background />

      <Content>
        <img src={logoImg} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input icon={FiUser} name="name" placeholder="Nome" />

          <Input icon={FiMail} name="email" placeholder="E-mail" />

          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar para o Logon
        </Link>
      </Content>
    </Container>
  );
};

export default SignUp;
