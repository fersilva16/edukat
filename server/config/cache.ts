import { RedisOptions } from 'ioredis';

type CacheConfig = {
  redis: RedisOptions;
};

const cacheConfig: CacheConfig = {
  redis: {
    lazyConnect: true,

    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    db: Number(process.env.REDIS_DB) || 0,
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
  },
};

export default cacheConfig;
