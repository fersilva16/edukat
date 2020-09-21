import { DateTime } from 'luxon';

import FakeRepository from '~/repositories/FakeRepository';
import { transform } from '~/utils/transformers';

import PartialUser from '@users/entities/PartialUser';
import IRawPartialUser from '@users/entities/raws/IRawPartialUser';

import ICreatePartialUserDTO from '../../dtos/ICreatePartialUserDTO';
import IPartialUserRepository from '../../IPartialUserRepository';

export default class FakePartialUserRepository
  extends FakeRepository<IRawPartialUser> implements IPartialUserRepository {
  async findById(id: string): Promise<PartialUser> {
    const partialUser = this.rows.find((row) => row.id === id);

    return transform.toClass(PartialUser, partialUser);
  }

  async findByEmail(email: string): Promise<PartialUser> {
    const partialUser = this.rows.find((row) => row.email === email);

    return transform.toClass(PartialUser, partialUser);
  }

  async create(data: ICreatePartialUserDTO): Promise<PartialUser> {
    const dateNow = DateTime.local().toISO()!;
    const id = this.generateId();

    const rawPartialUser: IRawPartialUser = {
      id,

      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,

      type_id: data.typeId,

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.rows.push(rawPartialUser);

    return transform.toClass(PartialUser, rawPartialUser);
  }

  async delete(id: string): Promise<void> {
    const index = this.rows.findIndex((row) => row.id === id);

    this.rows.splice(index, 1);
  }

  async clear(): Promise<void> {
    this.rows.splice(0, this.rows.length);
  }
}
