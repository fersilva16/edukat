import supertest from 'supertest';

import appConfig from '~/config/app';

export default function api() {
  return supertest(`http://${appConfig.host}:${appConfig.port}/api`);
}
