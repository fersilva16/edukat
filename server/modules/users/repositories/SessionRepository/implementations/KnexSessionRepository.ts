import { DateTime } from 'luxon';

import Repository from '~/repositories/Repository';
import transform from '~/utils/transform';
import transformRepositoryDTO from '~/utils/transformRepositoryDTO';

import IRawSession from '@users/entities/raws/IRawSession';
import Session from '@users/entities/Session';

import ICreateSessionDTO from '../dtos/ICreateSessionDTO';
import ISessionRepository from '../ISessionRepository';

export default class KnexSessionRepository
  extends Repository<IRawSession> implements ISessionRepository {
  constructor() {
    super('sessions');
  }

  async allExpired(): Promise<Session[]> {
    const rows = await this.table.select('*').where('expires_at', '<=', DateTime.local().toJSDate());

    return transform.toClass(Session, rows);
  }

  async findById(id: string): Promise<Session> {
    const findedRow = await this.table.select('*').where('id', id).first();

    return transform.toClass(Session, findedRow);
  }

  async create(data: ICreateSessionDTO): Promise<Session> {
    const id = await this.generateId();

    const row: IRawSession = {
      ...transformRepositoryDTO(data),

      id,

      created_at: DateTime.local().toISO()!,
    };

    await this.table.insert(row);

    return transform.toClass(Session, row);
  }

  async update(id: string, data: Partial<ICreateSessionDTO>): Promise<void> {
    await this.table.update(transformRepositoryDTO(data)).where('id', id);
  }

  async delete(id: string): Promise<void> {
    await this.table.delete().where('id', id);
  }

  async clear(): Promise<void> {
    await this.table.truncate();
  }
}
