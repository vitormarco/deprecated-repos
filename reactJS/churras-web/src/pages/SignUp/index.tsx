import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import {
  FiType,
  FiArrowLeft,
  FiMail,
  FiLock,
} from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { ContentCreate, Footer, Content } from './styles';

import MainPage from '../../components/MainPage';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface ISignUp {
  name: string;
  email: string;
  password: string;
}

const UserCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: ISignUp) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('E-mail obrigatório').email('O email precisar ser válido'),
        password: Yup.string().min(6, 'No mínimo 6  dígitos').required('Senha obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/users', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      addToast({
        type: 'success',
        title: 'Cadastro realizado!',
        description: 'Você já pode fazer seu logon no Churras',
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
        title: 'Erro ao criar usuário',
        description: 'Ocorreu um erro criar o usuário, cheque os dados',
      });
    }
  }, [addToast, history]);

  return (
    <MainPage>
      <Content>
        <ContentCreate>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <h3>Nome</h3>
              <Input icon={FiType} type="text" name="name" id="name" placeholder="Name" />
            </div>
            <div>
              <h3>Login</h3>
              <Input icon={FiMail} type="text" name="email" id="email" placeholder="E-mail" />
            </div>
            <div>
              <h3>Senha</h3>
              <Input icon={FiLock} type="password" name="password" id="password" placeholder="Senha" />
            </div>

            <Button type="submit">Criar</Button>
          </Form>
        </ContentCreate>

        <Footer>
          <Link to="/">
            <FiArrowLeft size="20" />
            voltar
          </Link>
        </Footer>
      </Content>
    </MainPage>
  );
};

export default UserCreate;
