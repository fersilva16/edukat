import Redis from 'ioredis';

import cacheConfig from '~/config/cache';

const redis = new Redis(cacheConfig.redis);

export default redis;

export function createRedisConnection(): Promise<void> {
  return redis.connect();
}
