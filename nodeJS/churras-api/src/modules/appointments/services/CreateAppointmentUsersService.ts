import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import ICreateAppointmentUsersDTO from '../dtos/ICreateAppointmentUsersDTO';

import AppointmentUser from '../infra/typeorm/entities/AppointmentsUsers';
import IAppointmentUsersRepository from '../repositories/IAppointmentUsersRepository';

@injectable()
class CreateAppointmentUsersService {
  constructor(
    @inject('AppointmentUserRepository')
    private appointmentUsersRepository: IAppointmentUsersRepository,
    @inject('UsersRepository')
    private userRepository: IUsersRepository,
  ) {}

  public async execute({
    total_price,
    paid,
    appointment_id,
    user_id,
  }: ICreateAppointmentUsersDTO): Promise<AppointmentUser> {
    const users = await this.appointmentUsersRepository.findAllUsersInAppointment(
      appointment_id,
    );

    const userAlredyInclude = users.findIndex(user => user.user_id === user_id);

    if (userAlredyInclude >= 0) {
      throw new AppError(
        'You can not insert a user if they already exist in the appointment',
      );
    }

    const appointmentUsers = await this.appointmentUsersRepository.create({
      total_price,
      paid,
      appointment_id,
      user_id,
    });

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Can not find user');
    }

    Object.assign(appointmentUsers, { name: user.name });

    return appointmentUsers;
  }
}

export default CreateAppointmentUsersService;
