import { plainToClass } from 'class-transformer';
import { DateTime } from 'luxon';

import Repository from '~/repositories/Repository';

import IRawSession from '@users/entities/raws/IRawSession';
import Session from '@users/entities/Session';

import ICreateSessionDTO from '../dtos/ICreateSessionDTO';
import ISessionRepository from '../ISessionRepository';

export default class KnexSessionRepository
  extends Repository<IRawSession> implements ISessionRepository {
  constructor() {
    super('sessions');
  }

  async findById(id: string): Promise<Session> {
    const rawSession = await this.table.select('*').where('id', id).first();

    return plainToClass(Session, rawSession);
  }

  async create(data: ICreateSessionDTO): Promise<Session> {
    const id = await this.generateId();

    const rawSession: IRawSession = {
      id,

      token: data.token,

      user_id: data.userId,

      created_at: DateTime.local().toISO()!,
      expires_at: data.expiresAt?.toISO()!,
    };

    const session = await this.table.insert(rawSession).returning('*');

    return plainToClass(Session, session[0]);
  }
}
