import { ensureDatabaseConnection } from './infra/knex';
import { createRedisConnection } from './infra/redis';
import createServer from './infra/http/server';
import logger from './logger';

export default async function initialize() {
  try {
    await ensureDatabaseConnection();
    await createRedisConnection();
    await createServer();
  } catch (error) {
    logger.error(error.message);

    process.exit(1);
  }
}
