import { Config } from 'knex';
import path from 'path';

const databaseConfig: Config = {
  client: 'pg',

  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_DATABASE || 'edukat',

    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD,
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
