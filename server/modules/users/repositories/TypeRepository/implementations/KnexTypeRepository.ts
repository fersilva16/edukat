import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';
import { plainToClass } from 'class-transformer';

import ICreateTypeDTO from '@users/dtos/ICreateTypeDTO';
import Type from '@users/entities/Type';
import IRawType from '@users/entities/raws/IRawType';

import knex from '~/infra/knex';

import ITypeRepository from '../ITypeRepository';

export default class KnexTypeRepository implements ITypeRepository {
  private table = knex.table<IRawType>('types');

  async findById(id: string): Promise<Type> {
    const rawType = await this.table.select('*').where('id', id).first();

    return plainToClass(Type, rawType);
  }

  async create(data: ICreateTypeDTO): Promise<Type> {
    const dateNow = DateTime.local().toISO();

    const rawType: IRawType = {
      id: uuid(),

      name: data.name,

      permissions: data.permissions,

      created_at: dateNow,
      updated_at: dateNow,
    };

    const type = await this.table.insert(rawType).returning('*');

    return plainToClass(Type, type[0]);
  }
}
