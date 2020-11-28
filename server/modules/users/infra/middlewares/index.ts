import { container } from 'tsyringe';

import createMiddleware from '~/utils/createMiddleware';

import { KeyofFlags } from '@users/dtos/Flags';

import AuthMiddleware from './Auth';
import PermissionsMiddleware from './Permissions';

const authMiddleware = container.resolve(AuthMiddleware);
const permissionsMiddleware = container.resolve(PermissionsMiddleware);

export const auth = createMiddleware(authMiddleware);

export const has = (...flags: KeyofFlags[]) => (
  createMiddleware(permissionsMiddleware, true, ...flags)
);

export const hasOneOf = (...flags: KeyofFlags[]) => (
  createMiddleware(permissionsMiddleware, false, ...flags)
);
