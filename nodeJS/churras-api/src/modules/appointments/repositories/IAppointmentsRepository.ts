import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllAppointmentsDTO from '../dtos/IFindAllAppointmentsDTO';

import Appointment from '../infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findById(id: string): Promise<Appointment | undefined>;
  findAllAppointment(data: IFindAllAppointmentsDTO): Promise<Appointment[]>;
}
