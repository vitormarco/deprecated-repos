import ICreateAppointmentUsersDTO from '../dtos/ICreateAppointmentUsersDTO';
import AppointmentUser from '../infra/typeorm/entities/AppointmentsUsers';

export default interface IAppointmentUsersRepository {
  create(data: ICreateAppointmentUsersDTO): Promise<AppointmentUser>;
  findAllUsersInAppointment(appointment_id: string): Promise<AppointmentUser[]>;
  findById(appointmentUser_id: string): Promise<AppointmentUser | undefined>;
  save(appointment_users: AppointmentUser): Promise<AppointmentUser>;
}
