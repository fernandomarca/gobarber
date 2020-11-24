import { Router } from 'express';

import ensuraAuthenticated from '@modules/users/infra/http/middlewares/ensuraAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensuraAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;

// appointmentsRouter.get('/', async (request, response) => {

//   const appointments = await appointmentRepository.find();
//   const user = request.user;
//   return response.json({ appointments, user });
// });
