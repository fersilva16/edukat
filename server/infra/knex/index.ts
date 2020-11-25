import createKnex, { PgConnectionConfig } from 'knex';

import databaseConfig from '~/config/database';
import logger from '~/logger';
import knexCustomLogger from '~/utils/knexCustomLogger';

const knex = createKnex({
  ...databaseConfig,

  log: knexCustomLogger,
});

export default knex;

export async function ensureDatabaseConnection(): Promise<void> {
  return new Promise((resolve, reject) => {
    knex.raw('select version()')
      .then(() => {
        const { host, port } = databaseConfig.connection as PgConnectionConfig;

        logger.info(`Successfully connected to ${host}:${port}!`, { label: 'database' });
        resolve();
      })
      .catch(reject);
  });
}
