import { Response, Request } from 'express';
import { container } from 'tsyringe';

import UpdateAppointmentUsersPaid from '@modules/appointments/services/UpdateAppointmentUsersPaid';

class AppointmentUsersController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { appointments_users_id } = request.params;
    const { paid } = request.body;

    const updateAppointmentUserPaid = container.resolve(
      UpdateAppointmentUsersPaid,
    );

    const appointmentUsers = await updateAppointmentUserPaid.execute({
      appointments_users_id,
      paid,
    });

    return response.json(appointmentUsers);
  }
}

export default AppointmentUsersController;
