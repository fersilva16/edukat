import { plainToClass } from 'class-transformer';
import { DateTime } from 'luxon';

import Repository from '~/repositories/Repository';

import ICreatePartialUserDTO from '@users/dtos/ICreatePartialUserDTO';
import PartialUser from '@users/entities/PartialUser';
import IRawPartialUser from '@users/entities/raws/IRawPartialUser';

import IPartialUserRepository from '../IPartialUserRepository';

export default class KnexPartialUserRepository
  extends Repository<IRawPartialUser> implements IPartialUserRepository {
  constructor() {
    super('partial_users');
  }

  async findById(id: string): Promise<PartialUser> {
    const rawPartialUser = await this.table.select('*').where('id', id).first();

    return plainToClass(PartialUser, rawPartialUser);
  }

  async findByEmail(email: string): Promise<PartialUser> {
    const rawPartialUser = await this.table.select('*').where('email', email).first();

    return plainToClass(PartialUser, rawPartialUser);
  }

  async create(data: ICreatePartialUserDTO): Promise<PartialUser> {
    const dateNow = DateTime.local().toISO();
    const id = await this.generateId();

    const rawPartialUser: IRawPartialUser = {
      id,

      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,

      type_id: data.typeId,

      created_at: dateNow,
      updated_at: dateNow,
    };

    const partialUser = await this.table.insert(rawPartialUser).returning('*');

    return plainToClass(PartialUser, partialUser[0]);
  }

  async clear(): Promise<void> {
    await this.table.truncate();
  }
}
