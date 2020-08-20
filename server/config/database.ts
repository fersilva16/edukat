import { ConnectionOptions } from 'typeorm';

const databaseConfig: ConnectionOptions = {
  type: 'postgres',

  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_DATABASE || 'edukat',

  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD,
};

export default databaseConfig;
