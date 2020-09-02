import 'reflect-metadata';

import './container';
import './infra/knex';

import { createRedisConnection } from './infra/redis';
import createServer from './infra/http/server';

createRedisConnection().then(() => createServer());
