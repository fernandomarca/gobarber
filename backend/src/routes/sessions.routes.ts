import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {

  const { email, password } = request.body;

  const authenticatedUser = new AuthenticateUserService();

  const { userWithoutPassword, token } = await authenticatedUser.execute({
    email,
    password
  });

  const user =
  {
    ...userWithoutPassword,
    password: '',
  }

  //delete user.password;

  return response.json({ user, token });

}
);

export default sessionsRouter;
