import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import e from 'express';
import IAppointmentUsersRepository from '../repositories/IAppointmentUsersRepository';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import AppointmentUser from '../infra/typeorm/entities/AppointmentsUsers';

interface IUser {
  id: string;
  user_id: string;
  name: string;
  paid: number;
  total_to_pay: number;
}

interface IAppointment {
  total_collected: number;
  total_people: number;
  title?: string;
  date?: Date;
}
interface IResponse {
  users: IUser[];
  appointment: IAppointment;
}
@injectable()
class ListAppointmentUsers {
  constructor(
    @inject('AppointmentUserRepository')
    private appointmentUsers: IAppointmentUsersRepository,
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(appointment_id: string): Promise<IResponse> {
    const appointmentUsers = await this.appointmentUsers.findAllUsersInAppointment(
      appointment_id,
    );
    let users: IUser[] = [];
    let appointment = {} as IAppointment;

    if (appointmentUsers.length > 0) {
      users = appointmentUsers.map(appointmentUser => ({
        id: appointmentUser.id,
        user_id: appointmentUser.user.id,
        name: appointmentUser.user.name,
        paid: Number(appointmentUser.paid),
        total_to_pay: Number(appointmentUser.total_price),
      }));

      const total_collected = appointmentUsers.reduce(
        (accumulator, appointUser) => {
          return accumulator + Number(appointUser.total_price);
        },
        0,
      );

      const total_people = appointmentUsers.length;

      const appointmentInfo = appointmentUsers.shift();

      appointment = {
        total_collected,
        total_people,
        title: appointmentInfo?.appointment.title,
        date: appointmentInfo?.appointment.date,
      };
    } else {
      const appointmentInfo = await this.appointmentsRepository.findById(
        appointment_id,
      );

      if (!appointmentInfo) throw new AppError('Can not find appointment');

      appointment = {
        total_collected: 0,
        total_people: 0,
        title: appointmentInfo.title,
        date: appointmentInfo.date,
      };
    }

    return { users, appointment };
  }
}

export default ListAppointmentUsers;
