import { Response, Request } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListAppointmentUsersService from '@modules/appointments/services/ListAppointmentUsersService';
import CreateAppointmentUsersService from '@modules/appointments/services/CreateAppointmentUsersService';

class AppointmentUsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { appointment_id } = request.params;

    const listAppointmentUsers = container.resolve(ListAppointmentUsersService);

    const appointmentUsers = await listAppointmentUsers.execute(appointment_id);

    return response.json(classToClass(appointmentUsers));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { appointment_id } = request.params;
    const { total_price, paid, user_id } = request.body;

    const createAppointmentUsers = container.resolve(
      CreateAppointmentUsersService,
    );

    const appointmentUsers = await createAppointmentUsers.execute({
      total_price,
      paid,
      user_id,
      appointment_id,
    });

    return response.json(appointmentUsers);
  }
}

export default AppointmentUsersController;
