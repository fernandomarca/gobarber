import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/Users.Model';

interface Request {
  email: string;
  password: string;
}

interface Response {
  userWithoutPassword: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const userWithoutPassword = await usersRepository.findOne({
      where: {
        email
      }
    });

    if (!userWithoutPassword) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    //user.password - senha criptografada
    //password - senha nao criptografada

    const passwordMatched = await compare(password, userWithoutPassword.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: userWithoutPassword.id,
      expiresIn,
    })

    return {
      userWithoutPassword,
      token
    };

  }
}

export default AuthenticateUserService;
