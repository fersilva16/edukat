import createKnex from 'knex';

import databaseConfig from '~/config/database';
import logger from '~/logger';

const knex = createKnex(databaseConfig);

export default knex;

export async function ensureDatabaseConnection(): Promise<void> {
  return new Promise((resolve, reject) => {
    knex.raw('select version()')
      .then(() => {
        logger.info(`Successfully connected to ${(databaseConfig.connection as any).host}:${(databaseConfig.connection as any).port}!`, { label: 'database' });
        resolve();
      })
      .catch(reject);
  });
}
