import Redis from 'ioredis';

import cacheConfig from '~/config/cache';
import logger from '~/logger';

const redis = new Redis(cacheConfig.redis);

export default redis;

export async function createRedisConnection(): Promise<void> {
  await redis.connect();

  const { host, port } = redis.options;

  logger.info(`Successfully connected to ${host}:${port}!`, { label: 'redis' });
}
