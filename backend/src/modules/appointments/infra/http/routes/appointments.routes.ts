import { Router } from 'express';

import ensuraAuthenticated from '@modules/users/infra/http/middlewares/ensuraAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

const providerAppointmentsController = new ProviderAppointmentsController();

appointmentsRouter.use(ensuraAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

appointmentsRouter.get('/me', providerAppointmentsController.index);

export default appointmentsRouter;


