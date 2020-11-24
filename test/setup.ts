import './utils/setupDependencies';

import 'reflect-metadata';
import '~/container';

import { listenForConnections } from '~/infra/http/server';
import knex from '~/infra/knex';
import { createRedisConnection } from '~/infra/redis';

import preloadKnexFiles from './utils/preloadKnexFiles';

export default async function setup() {
  // For some reason, if I not pre load the migrations and seeds files,
  // it's will fail because some TypeScript transpile bug.
  preloadKnexFiles();

  await knex.migrate.latest();
  await knex.seed.run();

  await createRedisConnection();
  await listenForConnections();
}
