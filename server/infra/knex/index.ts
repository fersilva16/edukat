import createKnex from 'knex';

import databaseConfig from '~/config/database';

const knex = createKnex(databaseConfig);

export default knex;

export async function ensureDatabaseConnection(): Promise<void> {
  return new Promise((resolve, reject) => {
    knex.select('version()')
      .then(() => resolve())
      .catch(reject);
  });
}
