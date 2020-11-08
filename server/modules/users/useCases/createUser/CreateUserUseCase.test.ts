import faker from 'faker';
import { Factory } from 'rosie';

import NoPermissionException from '~/exceptions/NoPermissionException';
import ResourceAlreadyExistsException from '~/exceptions/ResourceAlreadyExistsException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import ICreateTypeDTO from '~/modules/users/repositories/TypeRepository/dtos/ICreateTypeDTO';
import IMailProvider from '~/providers/MailProvider/IMailProvider';
import FakeMailProvider from '~/providers/MailProvider/implementations/fakes/FakeMailProvider';

import FakeTokenProvider from '@users/providers/TokenProvider/implementations/fakes/FakeTokenProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import ICreatePartialUserDTO from '@users/repositories/PartialUserRepository/dtos/ICreatePartialUserDTO';
import FakePartialUserRepository from '@users/repositories/PartialUserRepository/implementations/fakes/FakePartialUserRepository';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';
import FakeTypeRepository from '@users/repositories/TypeRepository/implementations/fakes/FakeTypeRepository';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import CreateUserUseCase from './CreateUserUseCase';

describe('CreateUserUseCase', () => {
  let createUserUseCase: CreateUserUseCase;
  let partialUserRepository: IPartialUserRepository;
  let typeRepository: ITypeRepository;
  let userRepository: IUserRepository;
  let tokenProvider: ITokenProvider;
  let mailProvider: IMailProvider;

  beforeAll(() => {
    partialUserRepository = new FakePartialUserRepository();
    typeRepository = new FakeTypeRepository();
    userRepository = new FakeUserRepository();
    tokenProvider = new FakeTokenProvider();
    mailProvider = new FakeMailProvider();

    createUserUseCase = new CreateUserUseCase(
      partialUserRepository,
      typeRepository,
      userRepository,
      tokenProvider,
      mailProvider,
    );
  });

  beforeEach(async () => {
    await userRepository.clear();
    await partialUserRepository.clear();
    await typeRepository.clear();
  });

  it('should be create user', async () => {
    const userFindByEmail = jest.spyOn(userRepository, 'findByEmail');
    const partialUserFindByEmail = jest.spyOn(partialUserRepository, 'findByEmail');
    const typeFindById = jest.spyOn(typeRepository, 'findById');
    const create = jest.spyOn(partialUserRepository, 'create');
    const generateToken = jest.spyOn(tokenProvider, 'generateToken');
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    const adminType = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type', { position: 0 }),
    );

    const type = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type', { position: 1 }),
    );

    const partialUser = Factory.build<ICreatePartialUserDTO>('partialUser');

    await createUserUseCase.execute({
      userType: adminType,
      ...partialUser,
      typeId: type.id,
    });

    expect(userFindByEmail).toHaveBeenCalledWith(partialUser.email);

    expect(partialUserFindByEmail).toHaveBeenCalledWith(partialUser.email);

    expect(typeFindById).toHaveBeenCalledWith(type.id);

    expect(create).toHaveBeenCalledWith({ ...partialUser, typeId: type.id });

    expect(generateToken).toHaveBeenCalled();

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be fail when user already exists', async () => {
    const adminType = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type', { position: 1 }),
    );

    const typeId = faker.random.alphaNumeric(6);
    const { email } = await userRepository.create(Factory.build('user'));

    expect(
      createUserUseCase.execute({
        userType: adminType,
        email,
        typeId,
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsException);
  });

  it('should be fail if type not exists', async () => {
    const adminType = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type', { position: 1 }),
    );

    const partialUser = Factory.build<ICreatePartialUserDTO>('partialUser');

    expect(
      createUserUseCase.execute({
        ...partialUser,
        userType: adminType,
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException);
  });

  it('should be fail if partial user type is greater than auth user type', async () => {
    const adminType = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type', { position: 0 }),
    );

    const type = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type', { position: 1 }),
    );

    const partialUser = Factory.build<ICreatePartialUserDTO>('partialUser');

    expect(
      createUserUseCase.execute({
        userType: type,
        ...partialUser,
        typeId: adminType.id,
      }),
    ).rejects.toBeInstanceOf(NoPermissionException);
  });

  it('should be fail when partial user already exists', async () => {
    const { email } = await partialUserRepository.create(Factory.build('partialUser'));

    const adminType = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type', { position: 1 }),
    );

    const type = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type', { position: 0 }),
    );

    expect(
      createUserUseCase.execute({
        userType: adminType,
        email,
        typeId: type.id,
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsException);
  });
});
