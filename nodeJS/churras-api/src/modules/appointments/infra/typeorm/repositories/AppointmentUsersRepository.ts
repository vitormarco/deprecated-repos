import ICreateAppointmentUsersDTO from '@modules/appointments/dtos/ICreateAppointmentUsersDTO';
import IAppointmentUsersRepository from '@modules/appointments/repositories/IAppointmentUsersRepository';
import { getRepository, Repository } from 'typeorm';

import AppointmentsUsers from '../entities/AppointmentsUsers';

class AppointmentUsersRepository implements IAppointmentUsersRepository {
  private ormRepository: Repository<AppointmentsUsers>;

  constructor() {
    this.ormRepository = getRepository(AppointmentsUsers);
  }

  public async create({
    appointment_id,
    user_id,
    total_price,
    paid,
  }: ICreateAppointmentUsersDTO): Promise<AppointmentsUsers> {
    const appointmentUsers = this.ormRepository.create({
      appointment_id,
      user_id,
      total_price,
      paid,
    });

    await this.ormRepository.save(appointmentUsers);

    return appointmentUsers;
  }

  public async findAllUsersInAppointment(
    appointment_id: string,
  ): Promise<AppointmentsUsers[]> {
    const appointmentUsers = this.ormRepository.find({
      where: { appointment_id },
      relations: ['user', 'appointment'],
    });

    return appointmentUsers;
  }

  public async findById(
    appointmentUser_id: string,
  ): Promise<AppointmentsUsers | undefined> {
    const appointmentUser = this.ormRepository.findOne(appointmentUser_id);

    return appointmentUser;
  }

  public async save(
    appointmentUsers: AppointmentsUsers,
  ): Promise<AppointmentsUsers> {
    return this.ormRepository.save(appointmentUsers);
  }
}

export default AppointmentUsersRepository;
