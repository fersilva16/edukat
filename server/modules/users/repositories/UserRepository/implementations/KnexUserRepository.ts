import { DateTime } from 'luxon';
import { injectable, inject } from 'tsyringe';

import Repository from '~/repositories/Repository';
import transform from '~/utils/transform';

import IRawUser from '@users/entities/raws/IRawUser';
import User from '@users/entities/User';
import IHashProvider from '@users/providers/HashProvider/IHashProvider';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUserRepository from '../IUserRepository';

@injectable()
export default class KnexUserRepository
  extends Repository<IRawUser> implements IUserRepository {
  constructor(
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {
    super('users');
  }

  async findById(id: string): Promise<User> {
    const rawUser = await this.table.select('*').where('id', id).first();

    return transform.toClass(User, rawUser);
  }

  async findByEmail(email: string): Promise<User> {
    const rawUser = await this.table.select('*').where('email', email).first();

    return transform.toClass(User, rawUser);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const dateNow = DateTime.local().toISO()!;
    const id = await this.generateId();

    const rawUser: IRawUser = {
      id,

      firstname: data.firstname,
      lastname: data.lastname,

      email: data.email,
      password: await this.hashProvider.hash(data.password),

      type_id: data.typeId,

      created_at: dateNow,
      updated_at: dateNow,
    };

    const user = await this.table.insert(rawUser).returning('*');

    return transform.toClass(User, user[0]);
  }

  async clear(): Promise<void> {
    await this.table.truncate();
  }
}
