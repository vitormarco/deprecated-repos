import { Response, Request, query } from 'express';

import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

interface IRequest {
  initial_date?: string;
  final_date?: string;
}
class AppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { initial_date, final_date }: IRequest = request.query;

    const listAppointments = container.resolve(ListAppointmentsService);

    const appointments = await listAppointments.execute({
      initial_date,
      final_date,
    });

    return response.json(appointments);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);

    const appointment = await createAppointment.execute({ title, date });

    return response.json(appointment);
  }
}

export default AppointmentsController;
