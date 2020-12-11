import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepositories';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICachaProvider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProviderService {

  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute({ user_id }: IRequest): Promise<User[]> {

    let users = await this.cacheProvider.recover<User[]>(`providers-list:${user_id}`);

    // let users = null;

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        except_user_id: user_id
      });
    }

    await this.cacheProvider.save(
      `providers-list:${user_id}`,
      classToClass(users)
    );

    return users;
  }
}

export default ListProviderService;
