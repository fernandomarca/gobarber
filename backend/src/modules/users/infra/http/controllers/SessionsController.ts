//index,show,create,update,delete

import { Response, Request } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {

    const { email, password } = request.body;

    const authenticatedUser = container.resolve(AuthenticateUserService);

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
}
