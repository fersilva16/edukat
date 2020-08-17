import express from 'express';
import { json } from 'body-parser';
import { createConnection } from 'typeorm';

import ssr from './ssr';
import ssrRoutes from './ssr/routes';
import { port, database } from './config';
import routes from './routes';

export default async function createApplication() {
  await ssr.prepare();

  await createConnection({ type: 'postgres', ...database });

  const server = express();

  server.use(json());
  server.use('/api', routes);
  server.use('/', ssrRoutes);

  server.listen(port, (error) => {
    if (error) throw error;

    // eslint-disable-next-line no-console
    console.log('Started!');
  });
}
