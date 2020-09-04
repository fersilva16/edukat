import faker from 'faker';
import { Factory } from 'rosie';

import ICreateUserDTO from '@users/dtos/ICreateUserDTO';

Factory.define<ICreateUserDTO>('user')
  .attr('firstname', () => faker.name.firstName())
  .attr('lastname', () => faker.name.lastName())
  .attr('username', ['firstname', 'lastname'], (firstname, lastname) => faker.internet.userName(firstname, lastname))
  .attr('email', ['firstname', 'lastname'], (firstname, lastname) => faker.internet.email(firstname, lastname))
  .attr('password', () => faker.internet.password());
