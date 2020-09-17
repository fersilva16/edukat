import { ClassType } from 'class-transformer-validator';
import { container } from 'tsyringe';

import createMiddleware from '~/utils/createMiddleware';

import LoggingMiddleware from './Logging';
import ValidateMiddleware from './Validate';

const loggingMiddleware = container.resolve(LoggingMiddleware);
const validateMiddleware = container.resolve(ValidateMiddleware);

export const logging = createMiddleware(loggingMiddleware);

export const validate = (cls: ClassType<any>) => createMiddleware(validateMiddleware, cls);
