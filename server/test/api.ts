import supertest from 'supertest';

import appConfig from '~/config/app';

export default supertest(`http://${appConfig.host}:${appConfig.port}/api`);
