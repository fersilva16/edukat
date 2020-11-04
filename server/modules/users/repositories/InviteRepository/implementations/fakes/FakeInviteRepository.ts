import { DateTime } from 'luxon';

import FakeRepository from '~/repositories/FakeRepository';
import transform from '~/utils/transform';
import transformRepositoryDTO from '~/utils/transformRepositoryDTO';

import Invite from '@users/entities/Invite';
import IRawInvite from '@users/entities/raws/IRawInvite';

import ICreateInviteDTO from '../../dtos/ICreateInviteDTO';
import IInviteRepository from '../../IInviteRepository';

export default class FakeInviteRepository
  extends FakeRepository<IRawInvite> implements IInviteRepository {
  async all(): Promise<Invite[]> {
    return transform.toClass(Invite, this.rows);
  }

  async findById(id: string): Promise<Invite> {
    const findedRow = this.rows.find((row) => row.id === id);

    return transform.toClass(Invite, findedRow);
  }

  async create({ uses, ...data }: ICreateInviteDTO): Promise<Invite> {
    const id = this.generateId();
    const dateNow = DateTime.local().toISO()!;

    const row: IRawInvite = {
      ...transformRepositoryDTO(data),

      uses: uses ?? 0,

      id,

      created_at: dateNow,
      updated_at: dateNow,
    };

    this.rows.push(row);

    return transform.toClass(Invite, row);
  }

  async update(id: string, data: Partial<ICreateInviteDTO>): Promise<void> {
    const index = this.rows.findIndex((row) => row.id === id);

    if (index >= 0) {
      this.rows[index] = {
        ...this.rows[index],
        ...transformRepositoryDTO(data),
      };
    }
  }

  async clear(): Promise<void> {
    this.rows.splice(0, this.rows.length);
  }
}
