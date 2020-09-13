import { plainToClass } from 'class-transformer';
import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import ICreateUserDTO from '@users/dtos/ICreateUserDTO';
import IRawUser from '@users/entities/raws/IRawUser';
import User from '@users/entities/User';

import IUserRepository from '../../IUserRepository';

export default class FakeUserRepository implements IUserRepository {
  private users: IRawUser[] = [];

  async getAll(): Promise<User[]> {
    return this.users.map((rawUser) => plainToClass(User, rawUser));
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((rawUser) => rawUser.id === id);

    return plainToClass(User, user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((rawUser) => rawUser.email === email);

    return plainToClass(User, user);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const dateNow = DateTime.local().toISO();

    const user: IRawUser = {
      id: uuid(),

      firstname: data.firstname,
      lastname: data.lastname,

      email: data.email,
      password: data.password,

      type_id: data.typeId,

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.users.push(user);

    return plainToClass(User, user);
  }

  async clear(): Promise<void> {
    this.users.splice(0, this.users.length);
  }
}
