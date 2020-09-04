import { Sql } from 'knex';

import knex from '~/infra/knex';

import logger from '.';

knex.on('query', (data: Sql) => {
  logger.debug(`"${data.sql}" - ${JSON.stringify(data.bindings)}`, { label: 'knex' });
});
