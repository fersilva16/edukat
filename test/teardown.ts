import { closeServer } from '~/infra/http/server';
import knex from '~/infra/knex';
import redis from '~/infra/redis';

export default async function teardown() {
  await knex.destroy();

  await redis.quit();

  await closeServer();
}
