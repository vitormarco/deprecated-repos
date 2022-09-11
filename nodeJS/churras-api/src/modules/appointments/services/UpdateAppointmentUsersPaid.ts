import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUpdateAppointmentUsersPaidDTO from '../dtos/IUpdateAppointmentUsersPaidDTO';

import AppointmentUser from '../infra/typeorm/entities/AppointmentsUsers';
import IAppointmentUsersRepository from '../repositories/IAppointmentUsersRepository';

@injectable()
class UpdateAppointmentUsersPaid {
  constructor(
    @inject('AppointmentUserRepository')
    private appointmentUsersRepository: IAppointmentUsersRepository,
  ) { }

  public async execute({
    appointments_users_id,
    paid,
  }: IUpdateAppointmentUsersPaidDTO): Promise<AppointmentUser> {
    const appointmentUser = await this.appointmentUsersRepository.findById(
      appointments_users_id,
    );

    if (!appointmentUser)
      throw new AppError('Only existing users in an appointment be paid.');

    appointmentUser.paid = paid;

    await this.appointmentUsersRepository.save(appointmentUser);

    return appointmentUser;
  }
}

export default UpdateAppointmentUsersPaid;
