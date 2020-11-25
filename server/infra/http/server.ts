import { createServer } from 'http';

import appConfig from '~/config/app';
import logger from '~/logger';

import app from './app';

const server = createServer(app);

export default server;

export async function listenForConnections() {
  return new Promise((resolve) => {
    server.listen(appConfig.port, appConfig.host, () => {
      logger.info(`Started! Listening to ${appConfig.host}:${appConfig.port}`, { label: 'server' });

      return resolve();
    });
  });
}

export async function closeServer() {
  return new Promise((resolve, reject) => {
    server.close((error) => {
      if (error) reject(error);

      return resolve();
    });
  });
}
