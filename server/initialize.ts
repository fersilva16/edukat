// import SessionCleanerJob from '@users/jobs/SessionCleaner';

import { listenForConnections } from './infra/http/server';
import { prepareSSR } from './infra/http/ssr';
import { ensureDatabaseConnection } from './infra/knex';
import { createRedisConnection } from './infra/redis';
import initializeScheduleJobs from './infra/scheduler';
import logger from './logger';

export default async function initialize() {
  try {
    await ensureDatabaseConnection();
    await createRedisConnection();
    await prepareSSR();
    await listenForConnections();

    initializeScheduleJobs([
      // SessionCleanerJob,
    ]);
  } catch (error) {
    logger.error(error.message);

    process.exit(1);
  }
}
