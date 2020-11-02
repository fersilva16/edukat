import { DateTime } from 'luxon';
import { injectable, inject } from 'tsyringe';

import Repository from '~/repositories/Repository';
import transform from '~/utils/transform';
import transformRepositoryDTO from '~/utils/transformRepositoryDTO';

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
    const findedRow = await this.table.select('*').where('id', id).first();

    return transform.toClass(User, findedRow);
  }

  async findByEmail(email: string): Promise<User> {
    const findedRow = await this.table.select('*').where('email', email).first();

    return transform.toClass(User, findedRow);
  }

  async create(fullData: ICreateUserDTO): Promise<User> {
    const dateNow = DateTime.local().toISO()!;
    const id = await this.generateId();

    const { password, ...data } = fullData;

    const row: IRawUser = {
      ...transformRepositoryDTO(data),

      password: await this.hashProvider.hash(password),

      id,

      created_at: dateNow,
      updated_at: dateNow,
    };

    await this.table.insert(row);

    return transform.toClass(User, row);
  }

  async clear(): Promise<void> {
    await this.table.truncate();
  }
}
