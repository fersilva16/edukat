import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';
import { plainToClass } from 'class-transformer';

import User from '@users/entities/User';
import IRawUser from '@users/entities/raws/IRawUser';
import ICreateUserDTO from '@users/dtos/ICreateUserDTO';

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

  async create(data: ICreateUserDTO): Promise<void> {
    const user: IRawUser = {
      ...data,

      id: uuid(),

      created_at: DateTime.local().toISO(),
      updated_at: DateTime.local().toISO(),
    };

    this.users.push(user);
  }
}
