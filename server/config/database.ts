import { Config } from 'knex';
import path from 'path';

import env from '~/utils/env';

import appConfig from './app';

const testConfig: Config = {
  client: 'sqlite3',

  connection: ':memory:',

  useNullAsDefault: true,
};

const defaultConfig: Config = {
  client: 'pg',

  connection: {
    host: env.string('DB_HOST', 'localhost'),
    port: env.number('DB_PORT', 5432),
    database: env.string('DB_DATABASE', 'edukat'),

    user: env.string('DB_USERNAME', 'postgres'),
    password: env.string('DB_PASSWORD'),
  },
};

const databaseConfig: Config = {
  ...(
    appConfig.env === 'test'
      ? testConfig
      : defaultConfig
  ),

  migrations: {
    tableName: 'migrations',
    directory: path.resolve(__dirname, '../infra/knex/migrations'),
  },

  seeds: {
    directory: path.resolve(__dirname, '../infra/knex/seeds'),
  },
};

export default databaseConfig;
