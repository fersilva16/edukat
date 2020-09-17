import { plainToClass } from 'class-transformer';

import cacheConfig from '~/config/cache';
import redis from '~/infra/redis';

import IRawSession from '@users/entities/raws/IRawSession';
import Session from '@users/entities/Session';

import ISessionCacheProvider from '../ISessionCacheProvider';

export default class RedisSessionCacheProvider implements ISessionCacheProvider {
  private prefix = 'sessions';

  private addPrefix(suffix: string): string {
    return `${this.prefix}:${suffix}`;
  }

  async save(id: string, session: Session): Promise<void> {
    const key = this.addPrefix(id);

    const rawSession: IRawSession = {
      ...session,

      created_at: session.created_at.toISO()!,
      expires_at: session.expires_at?.toISO()!,
    };

    await redis.hmset(key, new Map(Object.entries(rawSession)));

    await redis.expire(key, cacheConfig.expirationTime);
  }

  async exists(id: string): Promise<boolean> {
    const exists = await redis.exists(this.addPrefix(id));

    return Boolean(exists);
  }

  async recover(id: string): Promise<Session | undefined> {
    const rawSession = await redis.hgetall(this.addPrefix(id));

    if (!Object.keys(rawSession).length) return undefined;

    return plainToClass(Session, rawSession);
  }

  async invalidate(id: string): Promise<void> {
    await redis.del(this.addPrefix(id));
  }

  async invalidateAll(): Promise<void> {
    const keys = await redis.keys(this.addPrefix('*'));

    const pipeline = redis.pipeline();

    keys.forEach((key) => pipeline.del(key));

    const [error] = await pipeline.exec();

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (error) throw error;
  }
}
