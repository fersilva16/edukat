import faker from 'faker';
import { Factory } from 'rosie';

import appConfig from '~/config/app';
import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';

import ICreatePartialUserDTO from '@users/dtos/ICreatePartialUserDTO';
import FakeTokenProvider from '@users/providers/TokenProvider/implementations/fakes/FakeTokenProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import FakePartialUserRepository from '@users/repositories/PartialUserRepository/implementations/fakes/FakePartialUserRepository';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';

import ShowRegisterDataUseCase from './ShowRegisterDataUseCase';

describe('ShowRegisterDataUseCase', () => {
  let showRegisterDataUseCase: ShowRegisterDataUseCase;
  let tokenProvider: ITokenProvider;
  let partialUserRepository: IPartialUserRepository;

  beforeAll(() => {
    tokenProvider = new FakeTokenProvider();
    partialUserRepository = new FakePartialUserRepository();

    showRegisterDataUseCase = new ShowRegisterDataUseCase(
      tokenProvider,
      partialUserRepository,
    );
  });

  beforeEach(async () => {
    await partialUserRepository.clear();
  });

  it('should be return register data', async () => {
    const partialUser = await partialUserRepository.create(
      Factory.build<ICreatePartialUserDTO>('partialUser', {
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
      }),
    );

    const token = await tokenProvider.generateToken({
      id: partialUser.id,
      email: partialUser.email,
    });

    const parseToken = jest.spyOn(tokenProvider, 'parseToken');
    const findById = jest.spyOn(partialUserRepository, 'findById');

    const result = await showRegisterDataUseCase.execute({ token });

    expect(parseToken).toHaveBeenCalledWith(token);

    expect(findById).toHaveBeenCalledWith(partialUser.id);

    expect(result)
      .not.toBeUndefined()
      .toBeObject();

    expect(result.firstname).toBe(partialUser.firstname);

    expect(result.lastname).toBe(partialUser.lastname);
  });

  it('should be fail if id is invalid', async () => {
    const id = faker.random.alphaNumeric(appConfig.idLength);
    const email = faker.internet.email();

    const token = await tokenProvider.generateToken({ id, email });

    expect(
      showRegisterDataUseCase.execute({ token }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException);
  });

  it('should be fail if email is invalid', async () => {
    const partialUser = await partialUserRepository.create(Factory.build('partialUser'));

    const email = faker.internet.email();

    const token = await tokenProvider.generateToken({ id: partialUser.id, email });

    expect(
      showRegisterDataUseCase.execute({ token }),
    ).rejects.toBeInstanceOf(InvalidTokenException);
  });
});
