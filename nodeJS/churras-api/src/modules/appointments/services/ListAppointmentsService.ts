import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  initial_date?: string;
  final_date?: string;
}

type IResponse = Array<{
  appointment: Appointment;
  info: {
    total_people: number;
    total_collected: number;
  };
}>;

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    initial_date,
    final_date,
  }: IRequest): Promise<IResponse> {
    const allAppointment = await this.appointmentsRepository.findAllAppointment(
      {
        date_start: initial_date,
        date_end: final_date,
      },
    );

    const appointmentsWithInfo = allAppointment.map(appointment => ({
      appointment,
      info: {
        total_people: appointment.appointment_users.length,
        total_collected: appointment.appointment_users.reduce(
          (accumulator, user) => {
            return accumulator + Number(user.total_price);
          },
          0,
        ),
      },
    }));

    return appointmentsWithInfo;
  }
}

export default ListAppointmentsService;
