import { Router } from 'express';

import ensuraAuthenticated from '@modules/users/infra/http/middlewares/ensuraAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(ensuraAuthenticated);

appointmentsRouter.post('/', appointmentsController.create);

// appointmentsRouter.get('/', appointmentsController.list);

export default appointmentsRouter;


