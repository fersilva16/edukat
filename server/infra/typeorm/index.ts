import { createConnection as createTypeormConnection } from 'typeorm';

import databaseConfig from '~/config/database';

export default function createConnection() {
  return createTypeormConnection(databaseConfig);
}
