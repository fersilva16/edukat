import faker from 'faker';
import { Factory } from 'rosie';

import appConfig from '~/config/app';
import NoPermissionException from '~/exceptions/NoPermissionException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';

import IInviteRepository from '@users/repositories/InviteRepository/IInviteRepository';
import FakeInviteRepository from '@users/repositories/InviteRepository/implementations/fakes/FakeInviteRepository';
import ICreateTypeDTO from '@users/repositories/TypeRepository/dtos/ICreateTypeDTO';
import FakeTypeRepository from '@users/repositories/TypeRepository/implementations/fakes/FakeTypeRepository';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';
import ICreateUserDTO from '@users/repositories/UserRepository/dtos/ICreateUserDTO';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import CreateInviteUseCase from './CreateInviteUseCase';

describe('CreateInviteUseCase', () => {
  let createInviteUseCase: CreateInviteUseCase;
  let userRepository: IUserRepository;
  let typeRepository: ITypeRepository;
  let inviteRepository: IInviteRepository;

  beforeAll(() => {
    userRepository = new FakeUserRepository();
    typeRepository = new FakeTypeRepository();
    inviteRepository = new FakeInviteRepository();

    createInviteUseCase = new CreateInviteUseCase(
      typeRepository,
      inviteRepository,
    );
  });

  beforeEach(async () => {
    await typeRepository.clear();
    await inviteRepository.clear();
  });

  it('should be create invite', async () => {
    const userType = await typeRepository.create(Factory.build('type'));
    const user = await userRepository.create(
      Factory.build<ICreateUserDTO>('user', { typeId: userType.id }),
    );

    const type = await typeRepository.create(Factory.build('type'));

    const create = jest.spyOn(inviteRepository, 'create');
    const findById = jest.spyOn(typeRepository, 'findById');

    await createInviteUseCase.execute({
      user,
      userType,
      maxUses: faker.random.number(),
      typeId: type.id,
      expiresIn: faker.random.number(),
    });

    expect(findById).toHaveBeenCalledWith(type.id);

    expect(create).toHaveBeenCalled();
  });

  it('should be fail if type not exists', async () => {
    const userType = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type'),
    );

    const user = await userRepository.create(
      Factory.build<ICreateUserDTO>('user', { typeId: userType.id }),
    );

    expect(
      createInviteUseCase.execute({
        user,
        userType,
        typeId: faker.random.alphaNumeric(appConfig.idLength),
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException);
  });

  it('should be fail if type is greater than user type', async () => {
    const userType = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type', { position: 1 }),
    );

    const user = await userRepository.create(
      Factory.build<ICreateUserDTO>('user', { typeId: userType.id }),
    );

    const type = await typeRepository.create(
      Factory.build<ICreateTypeDTO>('type', { position: 0 }),
    );

    expect(
      createInviteUseCase.execute({
        user,
        userType,
        typeId: type.id,
      }),
    ).rejects.toBeInstanceOf(NoPermissionException);
  });
});
