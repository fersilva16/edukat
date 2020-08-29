import { plainToClass } from 'class-transformer';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';

import ICreateSessionDTO from '@users/dtos/ICreateSessionDTO';
import IRawSession from '@users/entities/raws/IRawSession';
import Session from '@users/entities/Session';

import knex from '~/infra/knex';

import ISessionRepository from '../ISessionRepository';

export default class KnexSessionRepository implements ISessionRepository {
  private table = knex.table<IRawSession>('sessions');

  async findById(id: string): Promise<Session> {
    const rawSession = await this.table.select('*').where('id', id).first();

    return plainToClass(Session, rawSession);
  }

  async create(data: ICreateSessionDTO): Promise<Session> {
    const rawSession: IRawSession = {
      id: uuid(),

      token: data.token,

      user_id: data.userId,

      created_at: DateTime.local().toISO(),
      expires_at: data.expiresAt?.toISO(),
    };

    const session = await this.table.insert(rawSession).returning('*');

    return plainToClass(Session, session[0]);
  }
}
