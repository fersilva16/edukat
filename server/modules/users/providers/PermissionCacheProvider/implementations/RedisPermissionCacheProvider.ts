import redis from '~/infra/redis';

import IPermissionCacheProvider from '../IPermissionCacheProvider';

export default class RedisPermissionCacheProvider implements IPermissionCacheProvider {
  async save(id: string, permissions: string): Promise<void> {
    await redis.set(`permissions:${id}`, permissions);
  }

  async recover(id: string): Promise<string> {
    return redis.get(`permissions:${id}`);
  }

  async invalidate(id: string): Promise<void> {
    await redis.del(`permissions:${id}`);
  }

  async invalidateAll(): Promise<void> {
    const keys = await redis.keys('permissions:*');

    const pipeline = redis.pipeline();

    keys.forEach((key) => pipeline.del(key));

    const [error] = await pipeline.exec();

    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    if (error) throw error;
  }
}
