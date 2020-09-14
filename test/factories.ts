import faker from 'faker';
import { Factory } from 'rosie';

import ICreatePartialUserDTO from '@users/dtos/ICreatePartialUserDTO';
import ICreateTypeDTO from '@users/dtos/ICreateTypeDTO';
import ICreateUserDTO from '@users/dtos/ICreateUserDTO';

Factory.define<ICreatePartialUserDTO>('partialUser')
  .attr('email', () => faker.internet.email())
  .attr('typeId', () => faker.random.alphaNumeric(6));

Factory.define<ICreateTypeDTO>('type')
  .attr('name', () => faker.random.word())
  .attr('permissions', () => '1');

Factory.define<ICreateUserDTO>('user')
  .attr('firstname', () => faker.name.firstName())
  .attr('lastname', () => faker.name.lastName())
  .attr('email', ['firstname', 'lastname'], (firstname, lastname) => faker.internet.email(firstname, lastname))
  .attr('password', () => faker.internet.password());
