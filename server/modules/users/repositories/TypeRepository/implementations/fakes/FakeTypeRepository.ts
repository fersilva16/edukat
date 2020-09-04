import { plainToClass } from 'class-transformer';
import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import ICreateTypeDTO from '@users/dtos/ICreateTypeDTO';
import IRawType from '@users/entities/raws/IRawType';
import Type from '@users/entities/Type';

import ITypeRepository from '../../ITypeRepository';

export default class KnexTypeRepository implements ITypeRepository {
  private types: IRawType[] = [];

  async findById(id: string): Promise<Type> {
    const type = this.types.find((rawType) => rawType.id === id);

    return plainToClass(Type, type);
  }

  async create(data: ICreateTypeDTO): Promise<Type> {
    const dateNow = DateTime.local().toISO();

    const type: IRawType = {
      id: uuid(),

      name: data.name,

      permissions: data.permissions,

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.types.push(type);

    return plainToClass(Type, type);
  }
}
