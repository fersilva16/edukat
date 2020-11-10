import '~/container';

import createServer from '~/infra/http/server';
import knex from '~/infra/knex';
import { createRedisConnection } from '~/infra/redis';

export default async function setup() {
  await knex.migrate.latest();
  await knex.seed.run();

  await createRedisConnection();
  await createServer();
}
