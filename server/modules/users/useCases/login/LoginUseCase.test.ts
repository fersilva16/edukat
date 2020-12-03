import faker from 'faker';
import { Factory } from 'rosie';

import InvalidCredentialsException from '~/exceptions/InvalidCredentialsException';

import IHashProvider from '@users/providers/HashProvider/IHashProvider';
import FakeHashProvider from '@users/providers/HashProvider/implementations/fakes/FakeHashProvider';
import FakeSessionProvider from '@users/providers/SessionProvider/implementations/fakes/FakeSessionProvider';
import ISessionProvider from '@users/providers/SessionProvider/ISessionProvider';
import FakeTokenProvider from '@users/providers/TokenProvider/implementations/fakes/FakeTokenProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import FakeSessionRepository from '@users/repositories/SessionRepository/implementations/fakes/FakeSessionRepository';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';
import ICreateUserDTO from '@users/repositories/UserRepository/dtos/ICreateUserDTO';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import LoginUseCase from './LoginUseCase';

describe('LoginUseCase', () => {
  let loginUseCase: LoginUseCase;
  let userRepository: IUserRepository;
  let hashProvider: IHashProvider;
  let sessionProvider: ISessionProvider;
  let sessionRepository: ISessionRepository;
  let tokenProvider: ITokenProvider;

  beforeAll(() => {
    userRepository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();
    sessionProvider = new FakeSessionProvider();
    sessionRepository = new FakeSessionRepository();
    tokenProvider = new FakeTokenProvider();

    loginUseCase = new LoginUseCase(
      userRepository,
      hashProvider,
      sessionProvider,
      sessionRepository,
      tokenProvider,
    );
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('should be login user', async () => {
    const findByEmail = jest.spyOn(userRepository, 'findByEmail');
    const verify = jest.spyOn(hashProvider, 'verify');
    const generateOpaqueToken = jest.spyOn(sessionProvider, 'generateOpaqueToken');
    const create = jest.spyOn(sessionRepository, 'create');
    const generatePublicSession = jest.spyOn(sessionProvider, 'generatePublicSession');

    const user = Factory.build<ICreateUserDTO>('user');

    const { password: hashPassword } = await userRepository.create(user);

    const session = await loginUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(findByEmail).toHaveBeenCalledWith(user.email);

    expect(verify).toHaveBeenCalledWith(hashPassword, user.password);

    expect(generateOpaqueToken).toHaveBeenCalled();

    expect(create).toHaveBeenCalled();

    expect(generatePublicSession).toHaveBeenCalled();

    expect(session)
      .not.toBeNull()
      .toBeObject();
  });

  it('should be generate remember me token when rememberMe is true', async () => {
    const user = Factory.build<ICreateUserDTO>('user');

    const { id } = await userRepository.create(user);

    const generateToken = jest.spyOn(tokenProvider, 'generateToken');
    const update = jest.spyOn(userRepository, 'update');

    const session = await loginUseCase.execute({
      email: user.email,
      password: user.password,
      rememberMe: true,
    });

    expect(generateToken).toHaveBeenCalledWith({ id }, false);

    expect(update).toHaveBeenCalled();

    expect(session)
      .not.toBeNull()
      .toBeObject()
      .toContainKey('rememberMeToken');
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
