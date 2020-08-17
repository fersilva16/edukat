import express from 'express';

import ssr from './ssr';
import ssrRoutes from './ssr/routes';
import { port } from './config';
import routes from './routes';

export default async function createApplication() {
  await ssr.prepare();

  const server = express();

  server.use(express.json());
  server.use('/api', routes);
  server.use('/', ssrRoutes);

  server.listen(port, (error) => {
    if (error) throw error;

    // eslint-disable-next-line no-console
    console.log('Started!');
  });
}
