import { RedisOptions } from 'ioredis';

import env from '~/utils/env';

type CacheConfig = {
  expirationTime: number;

  redis: RedisOptions;
};

const cacheConfig: CacheConfig = {
  expirationTime: 86400,

  redis: {
    lazyConnect: true,

    host: env.string('REDIS_HOST', 'localhost'),
    port: env.number('REDIS_PORT', 6379),
    db: env.number('REDIS_DB', 0),

    username: env.string('REDIS_USERNAME'),
    password: env.string('REDIS_PASSWORD'),
  },
};

export default cacheConfig;
