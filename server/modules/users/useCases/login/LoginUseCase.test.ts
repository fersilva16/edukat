import faker from 'faker';
import { Factory } from 'rosie';

import InvalidCredentialsException from '~/exceptions/InvalidCredentialsException';

import ICreateUserDTO from '@users/dtos/ICreateUserDTO';
import IHashProvider from '@users/providers/HashProvider/IHashProvider';
import FakeHashProvider from '@users/providers/HashProvider/implementations/fakes/FakeHashProvider';
import FakeSessionTokenProvider from '@users/providers/SessionTokenProvider/implementations/fakes/FakeSessionTokenProvider';
import ISessionTokenProvider from '@users/providers/SessionTokenProvider/ISessionTokenProvider';
import FakeSessionRepository from '@users/repositories/SessionRepository/implementations/fakes/FakeSessionRepository';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import LoginUseCase from './LoginUseCase';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let userRepository: IUserRepository;
  let hashProvider: IHashProvider;
  let sessionTokenProvider: ISessionTokenProvider;
  let sessionRepository: ISessionRepository;

  beforeAll(() => {
    userRepository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    sessionTokenProvider = new FakeSessionTokenProvider();
    sessionRepository = new FakeSessionRepository();

    loginUseCase = new LoginUseCase(
      userRepository,
      hashProvider,
      sessionTokenProvider,
      sessionRepository,
    );
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('should be return public token with email', async () => {
    const findByEmail = jest.spyOn(userRepository, 'findByEmail');
    const verify = jest.spyOn(hashProvider, 'verify');
    const generateToken = jest.spyOn(sessionTokenProvider, 'generateToken');
    const create = jest.spyOn(sessionRepository, 'create');
    const generatePublicToken = jest.spyOn(sessionTokenProvider, 'generatePublicToken');

    const user = Factory.build<ICreateUserDTO>('user');

    const { password: hashPassword } = await userRepository.create(user);

    const token = await loginUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(findByEmail).toHaveBeenCalledWith(user.email);

    expect(verify).toHaveBeenCalledWith(hashPassword, user.password);

    expect(generateToken).toHaveBeenCalled();

    expect(create).toHaveBeenCalled();

    expect(generatePublicToken).toHaveBeenCalled();

    expect(token)
      .not.toBeNull()
      .toBeObject();
  });

  it('should be fail if email is invalid', async () => {
    const user = Factory.build<ICreateUserDTO>('user');

    expect(
      loginUseCase.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsException);
  });

  it('should be fail if password is invalid', async () => {
    const user = Factory.build<ICreateUserDTO>('user');
    const invalidPassword = faker.internet.password();

    await userRepository.create(user);

    expect(
      loginUseCase.execute({
        email: user.email,
        password: invalidPassword,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsException);
  });
});
