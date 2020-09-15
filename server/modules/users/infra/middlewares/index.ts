import { container } from 'tsyringe';

import createMiddleware from '~/utils/createMiddleware';

import { KeyofFlags } from '@users/dtos/Flags';
import HasMiddleware from '@users/infra/middlewares/Has';

import AuthMiddleware from './Auth';

const authMiddleware = container.resolve(AuthMiddleware);
const hasMiddleware = container.resolve(HasMiddleware);

export const auth = createMiddleware(authMiddleware);

export const has = (...flags: KeyofFlags[]) => createMiddleware(hasMiddleware, ...flags);
