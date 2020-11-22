import faker from 'faker';
import { Factory } from 'rosie';

import appConfig from '~/config/app';

import ICreatePartialUserDTO from '@users/repositories/PartialUserRepository/dtos/ICreatePartialUserDTO';
import ICreateTypeDTO from '@users/repositories/TypeRepository/dtos/ICreateTypeDTO';
import ICreateUserDTO from '@users/repositories/UserRepository/dtos/ICreateUserDTO';

Factory.define<ICreatePartialUserDTO>('partialUser')
  .attr('email', () => faker.internet.email())
  .attr('typeId', () => faker.random.alphaNumeric(appConfig.idLength));

Factory.define<ICreateTypeDTO>('type')
  .attr('name', () => faker.random.word())
  .sequence('position', (i) => i - 1)
  .attr('permissions', () => '1');

Factory.define<ICreateUserDTO>('user')
  .attr('firstname', () => faker.name.firstName())
  .attr('lastname', () => faker.name.lastName())
  .attr('email', ['firstname', 'lastname'], (firstname, lastname) => faker.internet.email(firstname, lastname))
  .attr('password', () => faker.internet.password());
