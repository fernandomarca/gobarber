import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/fakeBCriptHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from './AuthenticateUserService';

describe('AuthenticateUser', () => {
  it("should be able to authenticate", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    const response = await authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123456"
    });

    expect(response).toHaveProperty('token');
    expect(response.userWithoutPassword).toEqual(user);
  });

  it("should not be able to authenticate with non existing user", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    expect(authenticateUser.execute({
      email: "johndoe@example.com",
      password: "123456"
    })).rejects.toBeInstanceOf(AppError);

  })


  it("should not be able to authenticate with wrong password", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const authenticateUser = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    expect(authenticateUser.execute({
      email: "johndoe@example.com",
      password: "wrong-password"
    })).rejects.toBeInstanceOf(AppError);
  });
});