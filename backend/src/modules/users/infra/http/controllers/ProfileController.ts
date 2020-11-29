import { Response, Request } from 'express';
import { container } from 'tsyringe';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';


export default class ProfileController {

  public async show(request: Request, response: Response) {
    const user_id = request.user.id;

    const showProfileService = container.resolve(ShowProfileService);

    const userShow = await showProfileService.execute({ user_id });

    const user = {
      ...userShow,
      password: undefined
    }

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    try {
      const user_id = request.user.id;
      const { name, email, password, old_password } = request.body;

      const updateProfileService = container.resolve(UpdateProfileService);

      const user = await updateProfileService.execute({
        user_id,
        name,
        email,
        password,
        old_password
      });

      const userWithoutPassword = {
        ...user,
        password: undefined
      }

      return response.status(201).json(userWithoutPassword);

    } catch (error) {

      return response.status(400).json({
        error: error.message
      });
    }

  }
}
