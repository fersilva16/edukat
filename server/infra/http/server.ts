import express from 'express';
import { json } from 'body-parser';

import appConfig from '~/config/app';
import routes from './routes';
import ssr from './ssr';

export default async function createServer() {
  await ssr.prepare();

  const app = express();

  app.use(json());
  app.use(routes);

  app.listen(appConfig.port, (error) => {
    if (error) throw error;

    // eslint-disable-next-line no-console
    console.log('Started!');
  });
}
