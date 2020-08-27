/* eslint-disable import/prefer-default-export -- Knex seed */

import 'reflect-metadata';

import KnexUserRepository from '@users/repositories/UserRepository/implementations/KnexUserRepository';
import ArgonHashProvider from '@users/providers/HashProvider/implementations/ArgonHashProvider';

import adminConfig from '~/config/admin';

const userRepository = new KnexUserRepository(
  new ArgonHashProvider(),
);

export async function seed(): Promise<void> {
  return userRepository.create(adminConfig);
}
