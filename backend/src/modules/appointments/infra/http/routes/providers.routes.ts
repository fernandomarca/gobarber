import { Router } from 'express';

import ensuraAuthenticated from '@modules/users/infra/http/middlewares/ensuraAuthenticated';

import ProvidersController from '../controllers/ProvidersController';

const providersRouter = Router();

const providersController = new ProvidersController();

providersRouter.use(ensuraAuthenticated);

providersRouter.get('/', providersController.index);

export default providersRouter;


