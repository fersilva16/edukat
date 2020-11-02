import { DateTime } from 'luxon';

import FakeRepository from '~/repositories/FakeRepository';
import transform from '~/utils/transform';
import transformRepositoryDTO from '~/utils/transformRepositoryDTO';

import IRawType from '@users/entities/raws/IRawType';
import Type from '@users/entities/Type';

import ICreateTypeDTO from '../../dtos/ICreateTypeDTO';
import ITypeRepository from '../../ITypeRepository';

export default class FakeTypeRepository
  extends FakeRepository<IRawType> implements ITypeRepository {
  async all(): Promise<Type[]> {
    return transform.toClass(Type, this.rows);
  }

  async findById(id: string): Promise<Type> {
    const findedRow = this.rows.find((row) => row.id === id);

    return transform.toClass(Type, findedRow);
  }

  async create(data: ICreateTypeDTO): Promise<Type> {
    const id = this.generateId();
    const dateNow = DateTime.local().toISO()!;

    const row: IRawType = {
      ...transformRepositoryDTO(data),

      id,

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.rows.push(row);

    return transform.toClass(Type, row);
  }

  async clear(): Promise<void> {
    this.rows.splice(0, this.rows.length);
  }
}
