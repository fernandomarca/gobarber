import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import ensuraAuthenticated from '@modules/users/infra/http/middlewares/ensuraAuthenticated';

import UsersController from '../controllers/UsersController';

import UsersAvatarController from '../controllers/UsersAvatarController';

const usersRouter = Router();

const usersController = new UsersController();
const usersAvatarController = new UsersAvatarController();

const upload = multer(uploadConfig);


usersRouter.post('/', usersController.create);

usersRouter.patch('/avatar', ensuraAuthenticated, upload.single('avatar'), usersAvatarController.update);
export default usersRouter;