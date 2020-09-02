import { plainToClass } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';

import PartialUser from '@users/entities/PartialUser';
import IRawPartialUser from '@users/entities/raws/IRawPartialUser';
import ICreatePartialUserDTO from '@users/dtos/ICreatePartialUserDTO';

import knex from '~/infra/knex';

import IPartialUserRepository from '../IPartialUserRepository';

export default class KnexPartialUserRepository implements IPartialUserRepository {
  private table = knex.table<IRawPartialUser>('partial_users');

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

    const rawPartialUser: IRawPartialUser = {
      id: uuid(),

      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,

      type_id: data.typeId,

      created_at: dateNow,
      updated_at: dateNow,
    };

    const partialUser = await this.table.insert(rawPartialUser).returning('*');

    return plainToClass(PartialUser, partialUser[0]);
  }
}
