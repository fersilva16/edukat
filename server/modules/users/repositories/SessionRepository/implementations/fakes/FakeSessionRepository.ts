import { plainToClass } from 'class-transformer';
import { DateTime } from 'luxon';

import FakeRepository from '~/repositories/FakeRepository';

import IRawSession from '@users/entities/raws/IRawSession';
import Session from '@users/entities/Session';

import ICreateSessionDTO from '../../dtos/ICreateSessionDTO';
import ISessionRepository from '../../ISessionRepository';

export default class FakeSessionRepository
  extends FakeRepository<IRawSession> implements ISessionRepository {
  async findById(id: string): Promise<Session> {
    const session = this.rows.find((rawSession) => rawSession.id === id);

    return plainToClass(Session, session);
  }

  async create(data: ICreateSessionDTO): Promise<Session> {
    const id = this.generateId();

    const rawSession: IRawSession = {
      id,

      token: data.token,

      user_id: data.userId,

      created_at: DateTime.local().toISO(),
      expires_at: data.expiresAt?.toISO(),
    };

    this.rows.push(rawSession);

    return plainToClass(Session, rawSession);
  }
}
