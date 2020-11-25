import fs from 'fs';
import winston, { transports, format } from 'winston';

import appConfig from '~/config/app';

const logger = winston.createLogger();

if (appConfig.env === 'production') {
  logger.add(
    new transports.Console({ level: 'info' }),
  );
} else if (appConfig.env === 'development') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.errors(),
        format.printf(({
          timestamp,
          level,
          label,
          message,
        }) => `${timestamp} ${level}${label ? ` [${label}]` : ''}: ${message}`),
      ),

      level: 'silly',
    }),
  );
} else {
  logger.add(
    new transports.Stream({
      stream: fs.createWriteStream('/dev/null'),
    }),
  );
}

export default logger;
