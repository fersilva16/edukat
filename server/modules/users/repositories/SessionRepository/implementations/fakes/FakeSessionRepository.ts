import { DateTime } from 'luxon';

import FakeRepository from '~/repositories/FakeRepository';
import transform from '~/utils/transform';

import IRawSession from '@users/entities/raws/IRawSession';
import Session from '@users/entities/Session';

import ICreateSessionDTO from '../../dtos/ICreateSessionDTO';
import ISessionRepository from '../../ISessionRepository';

export default class FakeSessionRepository
  extends FakeRepository<IRawSession> implements ISessionRepository {
  async allExpired(): Promise<Session[]> {
    const dateNow = DateTime.local().toJSDate();

    const sessions = this.rows.filter((row) => (row.expires_at as Date) < dateNow);

    return transform.toClass(Session, sessions);
  }

  async findById(id: string): Promise<Session> {
    const session = this.rows.find((rawSession) => rawSession.id === id);

    return transform.toClass(Session, session);
  }

  async create(data: ICreateSessionDTO): Promise<Session> {
    const id = this.generateId();

    const rawSession: IRawSession = {
      id,

      access_token: data.accessToken,

      refresh_token: data.refreshToken,

      user_id: data.userId,

      created_at: DateTime.local().toISO()!,
      expires_at: data.expiresAt?.toISO()!,
    };

    this.rows.push(rawSession);

    return transform.toClass(Session, rawSession);
  }

  async update(id: string, data: Partial<ICreateSessionDTO>): Promise<void> {
    for (let i = 0; i < this.rows.length; i += 1) {
      if (this.rows[i].id === id) this.rows[i] = { ...this.rows[i], ...data };
    }
  }

  async delete(id: string): Promise<void> {
    const index = this.rows.findIndex((row) => row.id === id);

    if (index >= 0) this.rows.splice(index, 1);
  }
}
