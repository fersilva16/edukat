import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import ISessionCacheProvider from '@users/providers/SessionCacheProvider/ISessionCacheProvider';
import IUserCacheProvider from '@users/providers/UserCacheProvider/IUserCacheProvider';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';

const tokenProvider = container.resolve<ITokenProvider>('TokenProvider');
const sessionCacheProvider = container.resolve<ISessionCacheProvider>('SessionCacheProvider');
const userCacheProvider = container.resolve<IUserCacheProvider>('UserCacheProvider');
const sessionRepository = container.resolve<ISessionRepository>('SessionProvider');
const userRepository = container.resolve<IUserRepository>('UserProvider');

export default async function auth(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = request.headers;

  const { id, hash } = await tokenProvider.parsePublicToken(authorization);

  const cachedSession = await sessionCacheProvider.recover(id);
  const session = cachedSession || await sessionRepository.findById(id);

  if (!session) throw new ResourceNotFoundException('Session');

  if (session.token !== hash) throw new InvalidTokenException();

  if (!cachedSession) await sessionCacheProvider.save(id, session);

  const cachedUser = await userCacheProvider.recover(session.user_id);
  const user = cachedUser || await userRepository.findById(session.user_id);

  if (!user) throw new ResourceNotFoundException('User');

  if (!cachedUser) await userCacheProvider.save(session.user_id, user);

  request.user = user;

  next();
}
