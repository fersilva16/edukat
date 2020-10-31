import { DateTime } from 'luxon';

import Repository from '~/repositories/Repository';
import transform from '~/utils/transform';

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
    const sessions = await this.table.select('*').where('expires_at', '<=', DateTime.local().toJSDate());

    return transform.toClass(Session, sessions);
  }

  async findById(id: string): Promise<Session> {
    const rawSession = await this.table.select('*').where('id', id).first();

    return transform.toClass(Session, rawSession);
  }

  async create(data: ICreateSessionDTO): Promise<Session> {
    const id = await this.generateId();

    const rawSession: IRawSession = {
      id,

      access_token: data.accessToken,

      refresh_token: data.refreshToken,

      user_id: data.userId,

      created_at: DateTime.local().toISO()!,
      expires_at: data.expiresAt?.toISO()!,
    };

    const session = await this.table.insert(rawSession).returning('*');

    return transform.toClass(Session, session[0]);
  }

  async update(id: string, data: Partial<ICreateSessionDTO>): Promise<void> {
    await this.table.update({
      access_token: data.accessToken,
      refresh_token: data.refreshToken,
      user_id: data.userId,
      expires_at: data.expiresAt?.toISO()!,
    }).where('id', id);
  }

  async delete(id: string): Promise<void> {
    await this.table.delete().where('id', id);
  }
}
