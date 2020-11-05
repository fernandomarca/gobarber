import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensuraAuthenticated from '../middlewares/ensuraAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  try {

    const { name, email, password } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password
    });

    // const userWithoutPassword = {
    //   id: user.id,
    //   name: user.name,
    //   email: user.email,
    //   created_at: user.created_at,
    //   updated_at: user.updated_at,
    // };

    const userWithoutPassword = {
      ...user,
      password: ''
    }

    return response.status(201).json(userWithoutPassword);

  } catch (error) {

    return response.status(400).json({
      error: error.message
    });
  }
})

usersRouter.patch('/avatar', ensuraAuthenticated, upload.single('avatar'), async (request, response) => {

  //console.log(request.file);
  response.json({ ok: true })
});
export default usersRouter;
