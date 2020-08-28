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

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((rawUser) => rawUser.email === email);

    return plainToClass(User, user);
  }

  async findByUsername(username: string): Promise<User> {
    const user = this.users.find((rawUser) => rawUser.username === username);

    return plainToClass(User, user);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const dateNow = DateTime.local().toISO();

    const user: IRawUser = {
      ...data,

      id: uuid(),

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.users.push(user);
  }
}
