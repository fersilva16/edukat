import { plainToClass } from 'class-transformer';
import { DateTime } from 'luxon';
import { v4 as uuid } from 'uuid';

import ICreateSessionDTO from '@users/dtos/ICreateSessionDTO';
import IRawSession from '@users/entities/raws/IRawSession';
import Session from '@users/entities/Session';

import ISessionRepository from '../../ISessionRepository';

export default class FakeSessionRepository implements ISessionRepository {
  private sessions: IRawSession[] = [];

  async findById(id: string): Promise<Session> {
    const session = this.sessions.find((rawSession) => rawSession.id === id);

    return plainToClass(Session, session);
  }

  async create(data: ICreateSessionDTO): Promise<Session> {
    const rawSession: IRawSession = {
      id: uuid(),

      token: data.token,

      user_id: data.userId,

      created_at: DateTime.local().toISO(),
      expires_at: data.expiresAt?.toISO(),
    };

    this.sessions.push(rawSession);

    return plainToClass(Session, rawSession);
  }
}
