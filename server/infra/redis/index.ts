import Redis from 'ioredis';

import cacheConfig from '~/config/cache';
import logger from '~/logger';

const redis = new Redis(cacheConfig.redis);

export default redis;

export async function createRedisConnection(): Promise<void> {
  await redis.connect();
  logger.info(`Successfully connected to ${cacheConfig.redis.host}:${cacheConfig.redis.port}!`, {
    label: 'redis',
  });
}
