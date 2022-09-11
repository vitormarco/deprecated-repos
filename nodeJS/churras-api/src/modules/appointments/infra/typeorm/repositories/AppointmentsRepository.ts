import { getRepository, Repository, MoreThanOrEqual } from 'typeorm';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointment from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllAppointmentsDTO from '@modules/appointments/dtos/IFindAllAppointmentsDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findAllAppointment({
    date_start,
  }: IFindAllAppointmentsDTO): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: {
        date: MoreThanOrEqual(date_start),
      },
      relations: ['appointment_users'],
    });

    return appointments;
  }

  public async findById(id: string): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne(id, {
      relations: ['appointment_users'],
    });

    return appointment;
  }

  public async create({
    title,
    date,
  }: ICreateAppointment): Promise<Appointment> {
    const appointment = this.ormRepository.create({
      title,
      date,
    });

    await this.ormRepository.save(appointment);

    return appointment;
  }
}

export default AppointmentsRepository;
