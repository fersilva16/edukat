// @ts-nocheck
/* Override next logging */

import * as log from 'next/dist/build/output/log';

import logger from '.';

const ssrLogger = logger.child({ label: 'ssr' });

log.error = (...message: string[]) => ssrLogger.error(message.join(' '));
log.info = (...message: string[]) => ssrLogger.info(message.join(' '));
log.ready = (...message: string[]) => ssrLogger.info(message.join(' '));
log.warn = (...message: string[]) => ssrLogger.warn(message.join(' '));
log.event = (...message: string[]) => ssrLogger.info(message.join(' '));
log.wait = () => {};
