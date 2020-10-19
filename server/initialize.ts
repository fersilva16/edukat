// import SessionCleanerJob from '@users/jobs/SessionCleaner';

import createServer from './infra/http/server';
import { ensureDatabaseConnection } from './infra/knex';
import { createRedisConnection } from './infra/redis';
import initializeScheduleJobs from './infra/scheduler';
import logger from './logger';

export default async function initialize() {
  try {
    await ensureDatabaseConnection();
    await createRedisConnection();
    await createServer();

    initializeScheduleJobs([
      // SessionCleanerJob,
    ]);
  } catch (error) {
    logger.error(error.message);

    process.exit(1);
  }
}
