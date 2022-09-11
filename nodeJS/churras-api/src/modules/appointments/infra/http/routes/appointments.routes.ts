import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import AppointmentsController from '../controller/AppointmentsController';
import AppointmentUsersController from '../controller/AppointmentUsersController';
import AppointmentUserPaidController from '../controller/AppointmentUserPaidController';

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
const appointmentUsersController = new AppointmentUsersController();
const appointmentUserPaid = new AppointmentUserPaidController();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      title: Joi.string().required(),
      date: Joi.date().required(),
    },
  }),
  appointmentsController.create,
);

appointmentsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      initial_date: Joi.string().isoDate().required(),
      final_date: Joi.string().isoDate(),
    },
  }),
  appointmentsController.index,
);

appointmentsRouter.get(
  '/:appointment_id/users',
  celebrate({
    [Segments.PARAMS]: {
      appointment_id: Joi.string().uuid().required(),
    },
  }),
  appointmentUsersController.index,
);

appointmentsRouter.post(
  '/:appointment_id/users',
  celebrate({
    [Segments.PARAMS]: {
      appointment_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      total_price: Joi.number().required(),
      paid: Joi.number(),
      user_id: Joi.string().uuid().required(),
    },
  }),
  appointmentUsersController.create,
);

appointmentsRouter.patch(
  '/:appointments_users_id/paid',
  celebrate({
    [Segments.PARAMS]: {
      appointments_users_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      paid: Joi.number().required(),
    },
  }),
  appointmentUserPaid.update,
);

export default appointmentsRouter;
