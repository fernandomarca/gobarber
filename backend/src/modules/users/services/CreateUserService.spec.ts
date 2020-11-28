import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/fakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/fakeBCriptHashProvider';

describe('CreateUsers', () => {
  it("should be able to create a new User", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('johndoe@example.com');
  });

  it("should not be able to create a new User with same email from another", async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);

    const user = await createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    });

    await expect(createUser.execute({
      name: "John Doe",
      email: "johndoe@example.com",
      password: "123456"
    })).rejects.toBeInstanceOf(AppError);
  })
});
