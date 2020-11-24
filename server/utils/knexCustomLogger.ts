import { Logger } from 'knex';

import logger from '~/logger';

const childLogger = logger.child({ label: 'knex' });

const knexCustomLogger: Logger = {
  warn: (message) => childLogger.warn(message),
  debug: (message) => childLogger.debug(message),
  error: (message) => childLogger.error(message),
  enableColors: false,
};

export default knexCustomLogger;
