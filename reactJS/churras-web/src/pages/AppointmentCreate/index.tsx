import React, { useRef, useCallback } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiType, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { ContentCreate, Footer, Content } from './styles';

import MainPage from '../../components/MainPage';

import Input from '../../components/Input';
import Button from '../../components/Button';
import api from '../../services/api';

interface ICreateAppointment {
  title: string;
  date: Date;
}

const AppointmentCreate: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: ICreateAppointment) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required('Titulo obrigatório'),
        date: Yup.date().required('Data obrigatória'),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post('/appointments', {
        title: data.title,
        date: data.date,
      });

      history.push('/appointments');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        return;
      }

      addToast({
        type: 'error',
        title: 'Erro ao criar agendamento',
        description: 'Ocorreu um erro criar o agendamento, cheque os dados',
      });
    }
  }, [addToast, history]);

  return (
    <MainPage>
      <Content>
        <ContentCreate>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div>
              <h3>Título</h3>
              <Input icon={FiType} type="text" name="title" id="title" placeholder="Titulo" />
            </div>
            <div>
              <h3>Data</h3>
              <Input icon={FiCalendar} type="date" name="date" id="date" placeholder="Data" />
            </div>

            <Button type="submit">Criar</Button>
          </Form>
        </ContentCreate>

        <Footer>
          <Link to="/appointments">
            <FiArrowLeft size="20" />
            voltar
          </Link>
        </Footer>
      </Content>
    </MainPage>
  );
};

export default AppointmentCreate;
