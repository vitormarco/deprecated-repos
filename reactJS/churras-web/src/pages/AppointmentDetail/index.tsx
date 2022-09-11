import React, { useCallback, useEffect, useState } from 'react';
import {
  FiUsers, FiDollarSign, FiLoader, FiArrowLeft,
} from 'react-icons/fi';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';

import api from '../../services/api';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Background,
  Footer,
  Content,
  AppointmentInfo,
  Header,
  Bottom,
  Top,
  Item,
  Load,
} from './styles';
import logo from '../../assets/logo.png';
import { useToast } from '../../hooks/toast';
import formatValue from '../../utils/formatValue';
import Button from '../../components/Button';
import MainPage from '../../components/MainPage';

interface IUser {
  id: string;
  user_id: string;
  name: string;
  paid: number;
  total_to_pay: number;
  formattedValue?: string;
}

interface IAppointment {
  total_collected: number;
  total_people: number;
  title: string;
  date: Date;
  formattedDate?: string;
  formattedValue?: string;
}

interface IStateAppointment {
  appointment: IAppointment;
  users: IUser[];
}

interface IParams {
  id_appointment: string;
}

const AppointmentDetail: React.FC = () => {
  const { addToast } = useToast();
  const [loaded, setLoaded] = useState(false);
  const [appointment, setAppointment] = useState<IStateAppointment>({} as IStateAppointment);
  const [userAlreadyEvent, setUserAlreadyEvent] = useState({} as IUser);
  const [userPaid, setUserPaid] = useState(false);
  const { id_appointment } = useParams<IParams>();
  const { user } = useAuth();

  const handleInclude = useCallback(async () => {
    try {
      const { data } = await api.post(`/appointments/${id_appointment}/users`, {
        user_id: user.id,
        total_price: '20.00',
        paid: 0,
      });

      const newUserAppointment = { ...appointment };
      const newUser = {
        user_id: data.user_id,
        id: data.id,
        name: data.name,
        paid: data.paid,
        total_to_pay: data.total_price,
        formattedValue: formatValue(data.total_price),
      };

      newUserAppointment.users.push(newUser);
      newUserAppointment.appointment.total_people += 1;
      newUserAppointment.appointment.formattedValue = formatValue(
        newUserAppointment.appointment.total_collected + data.total_price,
      );

      setAppointment(newUserAppointment);
      setUserAlreadyEvent(newUser);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao incluir usuário',
        description: 'Ops, ocorreu algum erro não esperado',
      });
    }
  }, [user.id, appointment, id_appointment, addToast]);

  const handlePay = useCallback(async () => {
    try {
      const { data } = await api.patch(`/appointments/${userAlreadyEvent.id}/paid`, {
        paid: Number(userAlreadyEvent.total_to_pay),
      });

      const payment = { ...appointment };
      const indexUser = payment.users.findIndex((el) => el.id === userAlreadyEvent.id);

      payment.users[indexUser].paid = data.paid;

      setAppointment(payment);
      setUserPaid(true);
    } catch (err) {
      addToast({
        type: 'error',
        title: 'Erro ao pagar',
        description: 'Ops, ocorreu algum erro não esperado',
      });
    }
  }, [addToast, userAlreadyEvent, appointment]);

  const getInfos = useCallback(async () => {
    try {
      const { data } = await api.get(`appointments/${id_appointment}/users`);

      const appointmentFormatted = {
        ...data.appointment,
        formattedDate: format(new Date(data.appointment.date), 'dd/MM'),
        formattedValue: formatValue(data.appointment.total_collected),
      };

      const usersFormatted = data.users.map((userInfo: IUser) => ({
        ...userInfo,
        formattedValue: formatValue(userInfo.total_to_pay),
      }));

      const userExistingEvent: IUser = data.users.find((el: IUser) => el.user_id === user.id);
      setUserAlreadyEvent(userExistingEvent);
      if (userExistingEvent) {
        const userAlreadyPay = userExistingEvent.paid === userExistingEvent.total_to_pay;
        setUserPaid(userAlreadyPay);
      }

      setAppointment({ users: usersFormatted, appointment: appointmentFormatted });
      setLoaded(true);
    } catch (err) {
      if (err?.response?.data?.message) {
        const { response: { data } } = err;

        addToast({
          type: data.status,
          title: 'Erro ao buscar o evento',
          description: data.message,
        });
      } else {
        addToast({
          type: 'error',
          title: 'Erro no sistema',
          description: 'Ops, ocorreu algum erro não esperado',
        });
      }
    }
  }, [id_appointment, addToast, user.id]);

  useEffect(() => {
    getInfos();
  }, [getInfos]);

  if (!loaded) {
    return (
      <Container>
        <Background>
          <h1>Agenda de Churras</h1>
        </Background>
        <Content>
          <Load>
            <FiLoader size="50" />
          </Load>
        </Content>
        <Footer>
          <img src={logo} alt="Trinca" />
        </Footer>
      </Container>
    );
  }
  return (
    <MainPage>
      <AppointmentInfo>
        <Header>
          <Top>
            <h3>{appointment.appointment.formattedDate}</h3>
            <div>
              <FiUsers size="15" />
              <span>{appointment.appointment.total_people}</span>
            </div>
          </Top>
          <Bottom>
            <h2>{appointment.appointment.title}</h2>
            <div>
              <div>
                <FiDollarSign size="12" />
              </div>
              <span>{appointment.appointment.formattedValue}</span>
            </div>
          </Bottom>
        </Header>
        <ul>
          {appointment.users.map((userInfo: IUser) => (
            <Item key={userInfo.user_id} paid={userInfo.paid === userInfo.total_to_pay}>
              <div>
                <span />
                <span>{userInfo.name}</span>
              </div>
              <span>{userInfo.formattedValue}</span>
            </Item>
          ))}
        </ul>
      </AppointmentInfo>
      <Footer>
        <Link to="/appointments">
          <FiArrowLeft size="20" />
          voltar
        </Link>
        {!userPaid && !!userAlreadyEvent && (
        <Button onClick={handlePay}>Pagar</Button>
        )}
        {!userAlreadyEvent && (
        <Button onClick={handleInclude}>Incluir</Button>
        )}
      </Footer>
    </MainPage>
  );
};

export default AppointmentDetail;
