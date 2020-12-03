import faker from 'faker';
import { Factory } from 'rosie';

import appConfig from '~/config/app';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';

import FakeTokenProvider from '@users/providers/TokenProvider/implementations/fakes/FakeTokenProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import RememberUserUseCase from './RememberUserUseCase';

describe('RememberUserUseCase', () => {
  let rememberUserUseCase: RememberUserUseCase;
  let tokenProvider: ITokenProvider;
  let userRepository: IUserRepository;

  beforeAll(() => {
    tokenProvider = new FakeTokenProvider();
    userRepository = new FakeUserRepository();

    rememberUserUseCase = new RememberUserUseCase(
      tokenProvider,
      userRepository,
    );
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('should be remember user', async () => {
    const parseToken = jest.spyOn(tokenProvider, 'parseToken');
    const findById = jest.spyOn(userRepository, 'findById');

    const { id, email } = await userRepository.create(Factory.build('user'));

    const token = await tokenProvider.generateToken({ id });

    const result = await rememberUserUseCase.execute({ token });

    expect(parseToken).toHaveBeenCalledWith(token);

    expect(findById).toHaveBeenCalledWith(id);

    expect(result)
      .not.toBeNull()
      .toBeObject()
      .toStrictEqual({ email });
  });

  it('should be fail if user not exists', async () => {
    const id = faker.random.alphaNumeric(appConfig.idLength);

    const token = await tokenProvider.generateToken({ id });

    expect(
      rememberUserUseCase.execute({ token }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException);
  });
});
