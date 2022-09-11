import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiMail, FiLock, FiLogIn } from 'react-icons/fi';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import {
  Container,
  Background,
  Content,
  AnimationContainer,
  Footer,
  FooterForm,
} from './styles';
import logo from '../../assets/logo.png';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('O email precisar ser válido'),
        password: Yup.string().required('Senha obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais',
      });
    }
  }, [signIn, addToast]);

  return (
    <Container>
      <Background>
        <h1>Agenda de Churras</h1>
      </Background>
      <Content>
        <AnimationContainer>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <h3>Login</h3>
              <Input icon={FiMail} type="text" name="email" id="email" placeholder="E-mail" />
            </div>
            <div>
              <h3>Senha</h3>
              <Input icon={FiLock} type="password" name="password" id="password" placeholder="Senha" />
            </div>

            <Button type="submit">Entrar</Button>
          </Form>
        </AnimationContainer>
        <FooterForm>
          <Link to="/signup">
            <FiLogIn size="20" />
            cadastrar
          </Link>
        </FooterForm>
      </Content>
      <Footer>
        <img src={logo} alt="Trinca" />
      </Footer>
    </Container>
  );
};

export default SignIn;
