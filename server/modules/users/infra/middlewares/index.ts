import { container } from 'tsyringe';

import createMiddleware from '~/utils/createMiddleware';

import { KeyofFlags } from '@users/dtos/Flags';

import AuthMiddleware from './Auth';
import HasMiddleware from './Has';

const authMiddleware = container.resolve(AuthMiddleware);
const hasMiddleware = container.resolve(HasMiddleware);

export const auth = createMiddleware(authMiddleware);

export const has = (...flags: KeyofFlags[]) => createMiddleware(hasMiddleware, ...flags);
