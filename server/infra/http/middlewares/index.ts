/* eslint-disable import/prefer-default-export */

import { container } from 'tsyringe';

import createMiddleware from '~/utils/createMiddleware';

import LoggingMiddleware from './Logging';

const loggingMiddleware = container.resolve(LoggingMiddleware);

export const logging = createMiddleware(loggingMiddleware);
