import { Factory } from 'rosie';
import faker from 'faker';

import FakeSessionRepository from '@users/repositories/SessionRepository/implementations/fakes/FakeSessionRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import FakeHashProvider from '@users/providers/HashProvider/implementations/fakes/FakeHashProvider';
import FakeTokenProvider from '@users/providers/TokenProvider/implementations/fakes/FakeTokenProvider';
import ICreateUserDTO from '@users/dtos/ICreateUserDTO';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IHashProvider from '@users/providers/HashProvider/IHashProvider';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';

import BadRequestException from '~/exceptions/BadRequestException';
import InvalidCredentialsException from '~/exceptions/InvalidCredentialsException';

import CreateSessionUseCase from './CreateSessionUseCase';

describe('CreateSessionUseCase', () => {
  let createSessionUseCase: CreateSessionUseCase;
  let userRepository: IUserRepository;
  let hashProvider: IHashProvider;
  let tokenProvider: ITokenProvider;
  let sessionRepository: ISessionRepository;

  beforeAll(() => {
    userRepository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    tokenProvider = new FakeTokenProvider();
    sessionRepository = new FakeSessionRepository();

    createSessionUseCase = new CreateSessionUseCase(
      userRepository,
      hashProvider,
      tokenProvider,
      sessionRepository,
    );
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('should be return public token with email', async () => {
    const findByEmail = jest.spyOn(userRepository, 'findByEmail');
    const verify = jest.spyOn(hashProvider, 'verify');
    const generateToken = jest.spyOn(tokenProvider, 'generateToken');
    const create = jest.spyOn(sessionRepository, 'create');
    const generatePublicToken = jest.spyOn(tokenProvider, 'generatePublicToken');

    const user = Factory.build<ICreateUserDTO>('user');

    const { password: hashPassword } = await userRepository.create(user);

    const token = await createSessionUseCase.execute({
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

  it('should be return public token with username', async () => {
    const findByUsername = jest.spyOn(userRepository, 'findByUsername');
    const verify = jest.spyOn(hashProvider, 'verify');
    const generateToken = jest.spyOn(tokenProvider, 'generateToken');
    const create = jest.spyOn(sessionRepository, 'create');
    const generatePublicToken = jest.spyOn(tokenProvider, 'generatePublicToken');

    const user = Factory.build<ICreateUserDTO>('user');

    const { password: hashPassword } = await userRepository.create(user);

    const token = await createSessionUseCase.execute({
      username: user.username,
      password: user.password,
    });

    expect(findByUsername).toHaveBeenCalledWith(user.username);

    expect(verify).toHaveBeenCalledWith(hashPassword, user.password);

    expect(generateToken).toHaveBeenCalled();

    expect(create).toHaveBeenCalled();

    expect(generatePublicToken).toHaveBeenCalled();

    expect(token)
      .not.toBeNull()
      .toBeObject();
  });

  it('should be fail if dto has email and username', async () => {
    const user = Factory.build<ICreateUserDTO>('user');

    expect(
      createSessionUseCase.execute({
        email: user.email,
        username: user.username,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be fail if email is invalid', async () => {
    const user = Factory.build<ICreateUserDTO>('user');

    expect(
      createSessionUseCase.execute({
        email: user.email,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsException);
  });

  it('should be fail if username is invalid', async () => {
    const user = Factory.build<ICreateUserDTO>('user');

    expect(
      createSessionUseCase.execute({
        username: user.username,
        password: user.password,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsException);
  });

  it('should be fail if password is invalid', async () => {
    const user = Factory.build<ICreateUserDTO>('user');
    const invalidPassword = faker.internet.password();

    await userRepository.create(user);

    expect(
      createSessionUseCase.execute({
        email: user.email,
        password: invalidPassword,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsException);
  });
});
