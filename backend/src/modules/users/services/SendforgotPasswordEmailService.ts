import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

import IUsersRepository from '../repositories/IUserRepositories';

import IUserTokensRepository from '../repositories/IUserTokensRepository';


interface IRequest {
  email: string,
}

@injectable()
class SendForgotPasswordEmailService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("userTokensRepository")
    private userTokensRepository: IUserTokensRepository,

    @inject("MailProvider")
    private mailProvider: IMailProvider,
  ) { }

  public async execute({ email }: IRequest): Promise<void> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokensRepository.generate(user.id)

    await this.mailProvider.sendMail(
      email,
      `Pedido de recuperação de senha recebido: ${token}`
    );
  }
}

export default SendForgotPasswordEmailService;
