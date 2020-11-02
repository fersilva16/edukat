import { DateTime } from 'luxon';

import Repository from '~/repositories/Repository';
import transform from '~/utils/transform';
import transformRepositoryDTO from '~/utils/transformRepositoryDTO';

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
    const rows = await this.table.select('*');

    return transform.toClass(Type, rows);
  }

  async findById(id: string): Promise<Type> {
    const findedRow = await this.table.select('*').where('id', id).first();

    return transform.toClass(Type, findedRow);
  }

  async create(data: ICreateTypeDTO): Promise<Type> {
    const id = await this.generateId();
    const dateNow = DateTime.local().toISO()!;

    const row: IRawType = {
      ...transformRepositoryDTO(data),

      id,

      created_at: dateNow,
      updated_at: dateNow,
    };

    await this.table.insert(row);

    return transform.toClass(Type, row);
  }

  async clear(): Promise<void> {
    await this.table.truncate();
  }
}
