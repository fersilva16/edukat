import { plainToClass } from 'class-transformer';
import { DateTime } from 'luxon';

import Repository from '~/repositories/Repository';

import IRawType from '@users/entities/raws/IRawType';
import Type from '@users/entities/Type';

import ICreateTypeDTO from '../dtos/ICreateTypeDTO';
import ITypeRepository from '../ITypeRepository';

export default class KnexTypeRepository
  extends Repository<IRawType> implements ITypeRepository {
  constructor() {
    super('types');
  }

  async all(): Promise<Type[]> {
    const types = await this.table.select('*');

    return plainToClass(Type, types);
  }

  async findById(id: string): Promise<Type> {
    const rawType = await this.table.select('*').where('id', id).first();

    return plainToClass(Type, rawType);
  }

  async create(data: ICreateTypeDTO): Promise<Type> {
    const dateNow = DateTime.local().toISO()!;
    const id = await this.generateId();

    const rawType: IRawType = {
      id,

      name: data.name,

      permissions: data.permissions,

      created_at: dateNow,
      updated_at: dateNow,
    };

    const type = await this.table.insert(rawType).returning('*');

    return plainToClass(Type, type[0]);
  }

  async clear(): Promise<void> {
    await this.table.truncate();
  }
}
