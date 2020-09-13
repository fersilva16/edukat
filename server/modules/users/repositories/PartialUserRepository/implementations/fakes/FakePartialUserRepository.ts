import { plainToClass } from 'class-transformer';
import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import ICreatePartialUserDTO from '@users/dtos/ICreatePartialUserDTO';
import PartialUser from '@users/entities/PartialUser';
import IRawPartialUser from '@users/entities/raws/IRawPartialUser';

import IPartialUserRepository from '../../IPartialUserRepository';

export default class FakePartialUserRepository implements IPartialUserRepository {
  private partialUsers: IRawPartialUser[] = [];

  async findById(id: string): Promise<PartialUser> {
    const partialUser = this.partialUsers.find((rawPartialUser) => rawPartialUser.id === id);

    return plainToClass(PartialUser, partialUser);
  }

  async findByEmail(email: string): Promise<PartialUser> {
    const partialUser = this.partialUsers.find((rawPartialUser) => rawPartialUser.email === email);

    return plainToClass(PartialUser, partialUser);
  }

  async create(data: ICreatePartialUserDTO): Promise<PartialUser> {
    const dateNow = DateTime.local().toISO();

    const rawPartialUser: IRawPartialUser = {
      id: uuid(),

      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,

      type_id: data.typeId,

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.partialUsers.push(rawPartialUser);

    return plainToClass(PartialUser, rawPartialUser);
  }

  async clear(): Promise<void> {
    this.partialUsers.splice(0, this.partialUsers.length);
  }
}
