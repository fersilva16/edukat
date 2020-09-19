import faker from 'faker';
import { Factory } from 'rosie';

import appConfig from '~/config/app';
import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';

import IRegisterTokenDTO from '@users/dtos/IRegisterTokenDTO';
import FakeTokenProvider from '@users/providers/TokenProvider/implementations/fakes/FakeTokenProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import FakePartialUserRepository from '@users/repositories/PartialUserRepository/implementations/fakes/FakePartialUserRepository';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import RegisterUseCase from './RegisterUseCase';

describe('RegisterUseCase', () => {
  let registerUseCase: RegisterUseCase;
  let tokenProvider: ITokenProvider;
  let partialUserRepository: IPartialUserRepository;
  let userRepository: IUserRepository;

  beforeAll(() => {
    tokenProvider = new FakeTokenProvider();
    partialUserRepository = new FakePartialUserRepository();
    userRepository = new FakeUserRepository();

    registerUseCase = new RegisterUseCase(
      tokenProvider,
      partialUserRepository,
      userRepository,
    );
  });

  beforeEach(async () => {
    await partialUserRepository.clear();
    await userRepository.clear();
  });

  it('should be register user', async () => {
    const partialUser = await partialUserRepository.create(Factory.build('partialUser'));

    const token = await tokenProvider.generateToken<IRegisterTokenDTO>({
      id: partialUser.id,
      email: partialUser.email,
    });

    const parseToken = jest.spyOn(tokenProvider, 'parseToken');
    const findById = jest.spyOn(partialUserRepository, 'findById');
    const partialUserDelete = jest.spyOn(partialUserRepository, 'delete');
    const create = jest.spyOn(userRepository, 'create');

    const firstname = faker.name.firstName();
    const lastname = faker.name.lastName();
    const password = faker.internet.password();

    await registerUseCase.execute({
      token,

      firstname,
      lastname,
      password,
    });

    expect(parseToken).toHaveBeenCalledWith(token);

    expect(findById).toHaveBeenCalledWith(partialUser.id);

    expect(partialUserDelete).toHaveBeenCalledWith(partialUser.id);

    expect(create).toHaveBeenCalledWith({
      firstname,
      lastname,
      email: partialUser.email,
      password,
      typeId: partialUser.typeId,
    });
  });

  it('should be fail if id is invalid', async () => {
    const id = faker.random.alphaNumeric(appConfig.idLength);
    const email = faker.internet.email();

    const token = await tokenProvider.generateToken<IRegisterTokenDTO>({ id, email });

    expect(
      registerUseCase.execute({
        token,

        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException);
  });

  it('should be fail if email is invalid', async () => {
    const { id } = await partialUserRepository.create(Factory.build('partialUser'));

    const email = faker.internet.email();

    const token = await tokenProvider.generateToken({ id, email });

    expect(
      registerUseCase.execute({
        token,

        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        password: faker.internet.password(),
      }),
    ).rejects.toBeInstanceOf(InvalidTokenException);
  });
});
