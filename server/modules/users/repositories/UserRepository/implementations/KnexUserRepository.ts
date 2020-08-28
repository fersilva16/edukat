import { inject } from 'tsyringe';
import { v4 as uuidv4 } from 'uuid';
import { DateTime } from 'luxon';
import { plainToClass } from 'class-transformer';

import ICreateUserDTO from '@users/dtos/ICreateUserDTO';
import User from '@users/entities/User';
import IRawUser from '@users/entities/raws/IRawUser';
import IHashProvider from '@users/providers/HashProvider/IHashProvider';

import knex from '~/infra/knex';

import IUserRepository from '../IUserRepository';

export default class KnexUserRepository implements IUserRepository {
  private table = knex.table<IRawUser>('users');

  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async getAll(): Promise<User[]> {
    const rawUsers = await this.table.select('*');

    return rawUsers.map((rawUser) => plainToClass(User, rawUser));
  }

  async findById(id: string): Promise<User> {
    const rawUser = await this.table.select('*').where('id', id).first();

    return plainToClass(User, rawUser);
  }

  async findByEmail(email: string): Promise<User> {
    const rawUser = await this.table.select('*').where('email', email).first();

    return plainToClass(User, rawUser);
  }

  async findByUsername(username: string): Promise<User> {
    const rawUser = await this.table.select('*').where('username', username).first();

    return plainToClass(User, rawUser);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const dateNow = DateTime.local().toISO();

    const user: IRawUser = {
      ...data,

      id: uuidv4(),

      password: await this.hashProvider.hash(data.password),

      created_at: dateNow,
      updated_at: dateNow,
    };

    await this.table.insert(user);
  }
}
