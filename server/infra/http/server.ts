import express from 'express';
import { json } from 'body-parser';

import appConfig from '~/config/app';
import logger from '~/logger';

import routes from './routes';
import ssr from './ssr';
import logging from './middlewares/logging';

export default async function createServer() {
  await ssr.prepare();

  const app = express();

  app.use(json());
  app.use(logging);
  app.use(routes);

  app.listen(appConfig.port, appConfig.host, (error) => {
    if (error) throw error;

    logger.info(`Started! Listening to ${appConfig.host}:${appConfig.port}`, { label: 'server' });
  });
}
