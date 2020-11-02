import { DateTime } from 'luxon';

import Repository from '~/repositories/Repository';
import transform from '~/utils/transform';
import transformRepositoryDTO from '~/utils/transformRepositoryDTO';

import PartialUser from '@users/entities/PartialUser';
import IRawPartialUser from '@users/entities/raws/IRawPartialUser';

import ICreatePartialUserDTO from '../dtos/ICreatePartialUserDTO';
import IPartialUserRepository from '../IPartialUserRepository';

export default class KnexPartialUserRepository
  extends Repository<IRawPartialUser> implements IPartialUserRepository {
  constructor() {
    super('partial_users');
  }

  async findById(id: string): Promise<PartialUser> {
    const findedRow = await this.table.select('*').where('id', id).first();

    return transform.toClass(PartialUser, findedRow);
  }

  async findByEmail(email: string): Promise<PartialUser> {
    const findedRow = await this.table.select('*').where('email', email).first();

    return transform.toClass(PartialUser, findedRow);
  }

  async create(data: ICreatePartialUserDTO): Promise<PartialUser> {
    const id = await this.generateId();
    const dateNow = DateTime.local().toISO()!;

    const row: IRawPartialUser = {
      ...transformRepositoryDTO(data),

      id,

      created_at: dateNow,
      updated_at: dateNow,
    };

    await this.table.insert(row);

    return transform.toClass(PartialUser, row);
  }

  async delete(id: string): Promise<void> {
    await this.table.delete().where('id', id);
  }

  async clear(): Promise<void> {
    await this.table.truncate();
  }
}
