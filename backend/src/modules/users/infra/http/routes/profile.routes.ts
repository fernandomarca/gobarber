import { Router } from 'express';

import ensuraAuthenticated from '@modules/users/infra/http/middlewares/ensuraAuthenticated';

import ProfileController from '../controllers/ProfileController';

const profileRouter = Router();

const profileController = new ProfileController();

profileRouter.use(ensuraAuthenticated);

profileRouter.put('/', profileController.update);

profileRouter.get('/', profileController.show);

export default profileRouter;
