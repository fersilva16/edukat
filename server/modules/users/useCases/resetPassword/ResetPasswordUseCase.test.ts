import faker from 'faker';
import { Factory } from 'rosie';

import appConfig from '~/config/app';
import InvalidCredentialsException from '~/exceptions/InvalidCredentialsException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import ICreateUserDTO from '~/modules/users/repositories/UserRepository/dtos/ICreateUserDTO';

import IHashProvider from '@users/providers/HashProvider/IHashProvider';
import FakeHashProvider from '@users/providers/HashProvider/implementations/fakes/FakeHashProvider';
import FakeTokenProvider from '@users/providers/TokenProvider/implementations/fakes/FakeTokenProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import ResetPasswordUseCase from './ResetPasswordUseCase';

describe('ResetPasswordUseCase', () => {
  let resetPasswordUseCase: ResetPasswordUseCase;
  let tokenProvider: ITokenProvider;
  let userRepository: IUserRepository;
  let hashProvider: IHashProvider;

  beforeAll(() => {
    tokenProvider = new FakeTokenProvider();
    userRepository = new FakeUserRepository();
    hashProvider = new FakeHashProvider();

    resetPasswordUseCase = new ResetPasswordUseCase(
      tokenProvider,
      userRepository,
      hashProvider,
    );
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it("should be change user's password", async () => {
    const oldPassword = faker.internet.password();
    const user = await userRepository.create(
      Factory.build<ICreateUserDTO>('user', { password: oldPassword }),
    );

    const token = await tokenProvider.generateToken({ id: user.id });

    const parseToken = jest.spyOn(tokenProvider, 'parseToken');
    const findById = jest.spyOn(userRepository, 'findById');
    const verify = jest.spyOn(hashProvider, 'verify');
    const update = jest.spyOn(userRepository, 'update');

    const newPassword = faker.internet.password();

    await resetPasswordUseCase.execute({
      token,
      oldPassword,
      newPassword,
      newPasswordConfirmation: newPassword,
    });

    expect(parseToken).toHaveBeenCalledWith(token);

    expect(findById).toHaveBeenCalledWith(user.id);

    expect(verify).toHaveBeenCalledWith(user.password, oldPassword);

    expect(update).toHaveBeenCalledWith(user.id, { password: newPassword });
  });

  it('should be fail if user not exists', async () => {
    const token = await tokenProvider.generateToken({
      id: faker.random.alphaNumeric(appConfig.idLength),
    });

    const newPassword = faker.internet.password();

    expect(
      resetPasswordUseCase.execute({
        token,
        oldPassword: faker.internet.password(),
        newPassword,
        newPasswordConfirmation: newPassword,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException);
  });

  it("should be fail if `old_password` doesn't match current user password", async () => {
    const user = await userRepository.create(Factory.build('user'));
    const token = await tokenProvider.generateToken({ id: user.id });

    const newPassword = faker.internet.password();

    expect(
      resetPasswordUseCase.execute({
        token,
        oldPassword: faker.internet.password(),
        newPassword,
        newPasswordConfirmation: newPassword,
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsException);
  });
});
