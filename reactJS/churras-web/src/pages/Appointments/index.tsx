import React, { useCallback, useEffect, useState } from 'react';
import { format } from 'date-fns';

import {
  Container,
  Background,
  Content,
  AnimationContainer,
  Footer,
  ListAppointment,
} from './styles';
import logo from '../../assets/logo.png';
import Appointment from './Appointment';

import api from '../../services/api';
import formatValue from '../../utils/formatValue';
import { useToast } from '../../hooks/toast';

interface IAppointments {
  appointment: {
    id: string;
    date: Date;
    title: string;
  },
  info: {
    total_collected: number;
    total_people: number;
  },
  formattedDate: string;
  formattedValue: string;
}

const Appointments: React.FC = () => {
  const { addToast } = useToast();
  const [appointments, setAppointments] = useState<IAppointments[]>([]);

  const getAppointment = useCallback(async () => {
    try {
      const { data } = await api.get(`/appointments/?initial_date=${format(Date.now(), 'yyyy-MM-dd')}`);

      const appointmentsFormatted = data.map(
        (appointment: IAppointments) => ({
          ...appointment,
          formattedDate: format(new Date(appointment.appointment.date), 'dd/MM'),
          formattedValue: formatValue(appointment.info.total_collected),
        }),
      );

      setAppointments(appointmentsFormatted);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao buscar os eventos',
        description: 'Ocorreu um erro ao buscar os eventos.',
      });
    }
  }, [addToast]);

  useEffect(() => {
    getAppointment();
  }, [getAppointment]);

  return (
    <Container>
      <Background>
        <h1>Agenda de Churras</h1>
      </Background>
      <Content>
        <AnimationContainer>
          <ListAppointment>
            {appointments.map((appointment:IAppointments) => (
              <Appointment
                key={appointment.appointment.id}
                id={appointment.appointment.id}
                date={appointment.formattedDate}
                title={appointment.appointment.title}
                totalPeople={appointment.info.total_people}
                totalCollected={appointment.formattedValue}
              />
            ))}
            <Appointment isCreate />
          </ListAppointment>
        </AnimationContainer>
      </Content>
      <Footer>
        <img src={logo} alt="Trinca" />
      </Footer>
    </Container>
  );
};

export default Appointments;
