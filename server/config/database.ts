import { Config } from 'knex';
import path from 'path';

import env from '~/utils/env';

const databaseConfig: Config = {
  client: 'pg',

  connection: {
    host: env.string('DB_HOST', 'localhost'),
    port: env.number('DB_PORT', 5432),
    database: env.string('DB_DATABASE', 'edukat'),

    user: env.string('DB_USERNAME', 'postgres'),
    password: env.string('DB_PASSWORD'),
  },

  migrations: {
    database: 'migrations',
    directory: path.resolve(__dirname, '../infra/knex/migrations'),
  },

  seeds: {
    directory: path.resolve(__dirname, '../infra/knex/seeds'),
  },
};

export default databaseConfig;
