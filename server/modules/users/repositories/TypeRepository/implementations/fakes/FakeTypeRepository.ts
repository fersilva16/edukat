import { plainToClass } from 'class-transformer';
import { DateTime } from 'luxon';

import FakeRepository from '~/repositories/FakeRepository';

import IRawType from '@users/entities/raws/IRawType';
import Type from '@users/entities/Type';

import ICreateTypeDTO from '../../dtos/ICreateTypeDTO';
import ITypeRepository from '../../ITypeRepository';

export default class FakeTypeRepository
  extends FakeRepository<IRawType> implements ITypeRepository {
  async all(): Promise<Type[]> {
    return plainToClass(Type, this.rows);
  }

  async findById(id: string): Promise<Type> {
    const type = this.rows.find((row) => row.id === id);

    return plainToClass(Type, type);
  }

  async create(data: ICreateTypeDTO): Promise<Type> {
    const dateNow = DateTime.local().toISO()!;
    const id = this.generateId();

    const type: IRawType = {
      id,

      name: data.name,

      position: data.position,

      permissions: data.permissions,

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.rows.push(type);

    return plainToClass(Type, type);
  }

  async clear(): Promise<void> {
    this.rows.splice(0, this.rows.length);
  }
}
