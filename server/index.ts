import express from 'express';
import next from 'next';

import { env, port } from './config';

const app = next({
  dev: env !== 'production',
  conf: {
    useFileSystemPublicRoutes: false,
  },
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('/', (req, res) => app.render(req, res, '/Home'));

  server.all('*', (req, res) => handle(req, res));

  server.listen(port, (error) => {
    if (error) throw error;

    console.log('Started!');
  });
});
