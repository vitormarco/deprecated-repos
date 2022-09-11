import { inject, injectable } from 'tsyringe';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute({
    title,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.create({
      title,
      date,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
