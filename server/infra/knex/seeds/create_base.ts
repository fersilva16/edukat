/* eslint-disable import/prefer-default-export -- Knex seed */

import 'reflect-metadata';

import '~/container';

import { container } from 'tsyringe';

import IUserRepository from '@users/repositories/UserRepository/IUserRepository';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';
import IPermissionProvider from '@users/providers/PermissionProvider/IPermissionProvider';
import Type from '@users/entities/Type';

import baseConfig, { TypeWithFlags } from '~/config/base';

const userRepository = container.resolve<IUserRepository>('UserRepository');
const typeRepository = container.resolve<ITypeRepository>('TypeRepository');
const permissionProvider = container.resolve<IPermissionProvider>('PermissionProvider');

async function createType(type: TypeWithFlags): Promise<Type> {
  return typeRepository.create({
    name: type.name,
    permissions: permissionProvider.join(type.flags).toString(),
  });
}

export async function seed(): Promise<void> {
  const { admin, types } = baseConfig;

  const { id } = await createType(types.admin);

  await createType(types.teacher);
  await createType(types.student);
  await createType(types.parent);

  await userRepository.create({
    ...admin,

    typeId: id,
  });
}
