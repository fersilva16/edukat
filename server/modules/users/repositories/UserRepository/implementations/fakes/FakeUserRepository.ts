import { DateTime } from 'luxon';

import FakeRepository from '~/repositories/FakeRepository';
import transform from '~/utils/transform';
import transformRepositoryDTO from '~/utils/transformRepositoryDTO';

import IRawUser from '@users/entities/raws/IRawUser';
import User from '@users/entities/User';

import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import IUserRepository from '../../IUserRepository';

export default class FakeUserRepository
  extends FakeRepository<IRawUser> implements IUserRepository {
  async findById(id: string): Promise<User> {
    const findedRow = this.rows.find((row) => row.id === id);

    return transform.toClass(User, findedRow);
  }

  async findByEmail(email: string): Promise<User> {
    const findedRow = this.rows.find((row) => row.email === email);

    return transform.toClass(User, findedRow);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const id = this.generateId();
    const dateNow = DateTime.local().toISO()!;

    const row: IRawUser = {
      ...transformRepositoryDTO(data),

      id,

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.rows.push(row);

    return transform.toClass(User, row);
  }

  async clear(): Promise<void> {
    this.rows.splice(0, this.rows.length);
  }
}
