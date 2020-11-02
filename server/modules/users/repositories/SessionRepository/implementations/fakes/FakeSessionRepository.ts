import { DateTime } from 'luxon';

import FakeRepository from '~/repositories/FakeRepository';
import transform from '~/utils/transform';
import transformRepositoryDTO from '~/utils/transformRepositoryDTO';

import IRawSession from '@users/entities/raws/IRawSession';
import Session from '@users/entities/Session';

import ICreateSessionDTO from '../../dtos/ICreateSessionDTO';
import ISessionRepository from '../../ISessionRepository';

export default class FakeSessionRepository
  extends FakeRepository<IRawSession> implements ISessionRepository {
  async allExpired(): Promise<Session[]> {
    const dateNow = DateTime.local().toJSDate();

    const rows = this.rows.filter((row) => (row.expires_at as Date) < dateNow);

    return transform.toClass(Session, rows);
  }

  async findById(id: string): Promise<Session> {
    const findedRow = this.rows.find((row) => row.id === id);

    return transform.toClass(Session, findedRow);
  }

  async create(data: ICreateSessionDTO): Promise<Session> {
    const id = this.generateId();

    const row: IRawSession = {
      ...transformRepositoryDTO(data),

      id,

      created_at: DateTime.local().toISO()!,
    };

    this.rows.push(row);

    return transform.toClass(Session, row);
  }

  async update(id: string, data: Partial<ICreateSessionDTO>): Promise<void> {
    const index = this.rows.findIndex((row) => row.id === id);

    if (index >= 0) {
      this.rows[index] = {
        ...this.rows[index],
        ...transformRepositoryDTO(data),
      };
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.rows.findIndex((row) => row.id === id);

    if (index >= 0) this.rows.splice(index, 1);
  }

  async clear(): Promise<void> {
    this.rows.splice(0, this.rows.length);
  }
}
