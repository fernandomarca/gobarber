/**
 * Retorna um agendamento se encontrado
 */
import { getRepository, Repository } from 'typeorm';

import User from '../entities/User';

import IUsersRepository from '@modules/users/repositories/IUserRepositories';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';


class UserRepository implements IUsersRepository {

  private ormRepository: Repository<User>

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

}

//findByDate(date).then(response=>{});

export default UserRepository;