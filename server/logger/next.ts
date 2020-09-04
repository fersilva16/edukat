/* Override next logging */

import * as log from 'next/dist/build/output/log';

import logger from '.';

const ssrLogger = logger.child({ label: 'ssr' });

const mapper: Partial<Record<keyof typeof log, (...message: string[]) => void>> = {
  error: (...message) => ssrLogger.error(message.join(' ')),
  info: (...message) => ssrLogger.info(message.join(' ')),
  ready: (...message) => ssrLogger.info(message.join(' ')),
  warn: (...message) => ssrLogger.warn(message.join(' ')),
  event: (...message) => ssrLogger.info(message.join(' ')),
  wait: () => {},
};

Object.getOwnPropertyNames(log).forEach((name) => {
  if (mapper[name]) log[name] = mapper[name];
});
