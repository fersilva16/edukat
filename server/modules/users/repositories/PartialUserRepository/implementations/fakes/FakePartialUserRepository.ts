import { DateTime } from 'luxon';

import FakeRepository from '~/repositories/FakeRepository';
import transform from '~/utils/transform';
import transformRepositoryDTO from '~/utils/transformRepositoryDTO';

import PartialUser from '@users/entities/PartialUser';
import IRawPartialUser from '@users/entities/raws/IRawPartialUser';

import ICreatePartialUserDTO from '../../dtos/ICreatePartialUserDTO';
import IPartialUserRepository from '../../IPartialUserRepository';

export default class FakePartialUserRepository
  extends FakeRepository<IRawPartialUser> implements IPartialUserRepository {
  async findById(id: string): Promise<PartialUser> {
    const findedRow = this.rows.find((row) => row.id === id);

    return transform.toClass(PartialUser, findedRow);
  }

  async findByEmail(email: string): Promise<PartialUser> {
    const findedRow = this.rows.find((row) => row.email === email);

    return transform.toClass(PartialUser, findedRow);
  }

  async create(data: ICreatePartialUserDTO): Promise<PartialUser> {
    const id = this.generateId();
    const dateNow = DateTime.local().toISO()!;

    const row: IRawPartialUser = {
      ...transformRepositoryDTO(data),

      id,

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.rows.push(row);

    return transform.toClass(PartialUser, row);
  }

  async delete(id: string): Promise<void> {
    const index = this.rows.findIndex((row) => row.id === id);

    if (index >= 0) this.rows.splice(index, 1);
  }

  async clear(): Promise<void> {
    this.rows.splice(0, this.rows.length);
  }
}
