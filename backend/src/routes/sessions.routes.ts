import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

  const { email, password } = request.body;

  const authenticatedUser = new AuthenticateUserService();

  const { user, token } = await authenticatedUser.execute({
    email,
    password
  });

  const userWithoutPassword = {
    ...user,
    password: '',
    token
  }

  //delete user.password;

  return response.json({ userWithoutPassword });

}
);

export default sessionsRouter;
