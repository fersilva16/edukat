import faker from 'faker';
import { Factory } from 'rosie';

import appConfig from '~/config/app';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';

import FakeUserCacheProvider from '@users/providers/UserCacheProvider/implementations/fakes/FakeUserCacheProvider';
import IUserCacheProvider from '@users/providers/UserCacheProvider/IUserCacheProvider';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import ShowCurrentUserUseCase from './ShowCurrentUserUseCase';

describe('ShowCurrentUserUseCase', () => {
  let showCurrentUserUseCase: ShowCurrentUserUseCase;
  let userRepository: IUserRepository;
  let userCacheProvider: IUserCacheProvider;

  beforeAll(() => {
    userRepository = new FakeUserRepository();
    userCacheProvider = new FakeUserCacheProvider();

    showCurrentUserUseCase = new ShowCurrentUserUseCase(
      userRepository,
      userCacheProvider,
    );
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('should be return user by id', async () => {
    const user = await userRepository.create(Factory.build('user'));

    const findById = jest.spyOn(userRepository, 'findById');
    const save = jest.spyOn(userCacheProvider, 'save');

    const result = await showCurrentUserUseCase.execute({ id: user.id });

    expect(findById).toHaveBeenCalledWith(user.id);

    expect(save).toHaveBeenCalledWith(user);

    expect(result).toStrictEqual(user);
  });

  it('should be fail if user not exists', async () => {
    const id = faker.random.alphaNumeric(appConfig.idLength);

    expect(
      showCurrentUserUseCase.execute({ id }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException);
  });
});
