import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import ISessionCacheProvider from '@users/providers/SessionCacheProvider/ISessionCacheProvider';
import IUserCacheProvider from '@users/providers/UserCacheProvider/IUserCacheProvider';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';
import ISessionTokenProvider from '~/modules/users/providers/SessionTokenProvider/ISessionTokenProvider';

import createMiddleware from '~/utils/createMiddleware';
import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';

const sessionTokenProvider = container.resolve<ISessionTokenProvider>('SessionTokenProvider');
const sessionCacheProvider = container.resolve<ISessionCacheProvider>('SessionCacheProvider');
const userCacheProvider = container.resolve<IUserCacheProvider>('UserCacheProvider');
const sessionRepository = container.resolve<ISessionRepository>('SessionRepository');
const userRepository = container.resolve<IUserRepository>('UserRepository');

async function auth(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = request.headers;

  if (!authorization) throw new InvalidTokenException();

  const { id, hash } = await sessionTokenProvider.parsePublicToken(authorization);

  const hasCachedSession = await sessionCacheProvider.exists(id);

  const session = hasCachedSession
    ? await sessionCacheProvider.recover(id)
    : await sessionRepository.findById(id);

  if (!session) throw new ResourceNotFoundException('Session');

  if (session.token !== hash) throw new InvalidTokenException();

  if (!hasCachedSession) await sessionCacheProvider.save(id, session);

  const hasCachedUser = await userCacheProvider.exists(session.user_id);

  const user = hasCachedUser
    ? await userCacheProvider.recover(session.user_id)
    : await userRepository.findById(session.user_id);

  if (!user) throw new ResourceNotFoundException('User');

  if (!hasCachedUser) await userCacheProvider.save(session.user_id, user);

  request.user = user;

  next();
}

export default createMiddleware(auth);
