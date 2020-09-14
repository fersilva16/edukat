import { plainToClass } from 'class-transformer';
import { DateTime } from 'luxon';

import FakeRepository from '~/repositories/FakeRepository';

import ICreateUserDTO from '@users/dtos/ICreateUserDTO';
import IRawUser from '@users/entities/raws/IRawUser';
import User from '@users/entities/User';

import IUserRepository from '../../IUserRepository';

export default class FakeUserRepository
  extends FakeRepository<IRawUser> implements IUserRepository {
  async getAll(): Promise<User[]> {
    return this.rows.map((rawUser) => plainToClass(User, rawUser));
  }

  async findById(id: string): Promise<User> {
    const user = this.rows.find((rawUser) => rawUser.id === id);

    return plainToClass(User, user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.rows.find((rawUser) => rawUser.email === email);

    return plainToClass(User, user);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const dateNow = DateTime.local().toISO();
    const id = this.generateId();

    const user: IRawUser = {
      id,

      firstname: data.firstname,
      lastname: data.lastname,

      email: data.email,
      password: data.password,

      type_id: data.typeId,

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.rows.push(user);

    return plainToClass(User, user);
  }

  async clear(): Promise<void> {
    this.rows.splice(0, this.rows.length);
  }
}
