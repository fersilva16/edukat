import { plainToClass } from 'class-transformer';

import User from '@users/entities/User';
import IRawUser from '@users/entities/raws/IRawUser';

import redis from '~/infra/redis';

import IUserCacheProvider from '../IUserCacheProvider';

export default class RedisUserCacheProvider implements IUserCacheProvider {
  private prefix = 'users';

  private expirationTime = 86400;

  private addPrefix(suffix: string): string {
    return `${this.prefix}:${suffix}`;
  }

  async save(id: string, user: User): Promise<void> {
    const key = this.addPrefix(id);

    const rawUser: IRawUser = {
      ...user,

      created_at: user.created_at.toISO(),
      updated_at: user.updated_at.toISO(),
    };

    await redis.hmset(key, new Map(Object.entries(rawUser)));

    await redis.expire(key, this.expirationTime);
  }

  async exists(id: string): Promise<boolean> {
    const exists = await redis.exists(this.addPrefix(id));

    return Boolean(exists);
  }

  async recover(id: string): Promise<User> {
    const rawUser = await redis.hmget(this.addPrefix(id)) as unknown as IRawUser;

    return plainToClass(User, rawUser);
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
