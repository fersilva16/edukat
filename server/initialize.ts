import { ensureDatabaseConnection } from './infra/knex';
import { createRedisConnection } from './infra/redis';
import createServer from './infra/http/server';

export default async function initialize() {
  await ensureDatabaseConnection();
  await createRedisConnection();
  await createServer();
}
