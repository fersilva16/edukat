import { Request, Response, NextFunction } from 'express';
import { DateTime } from 'luxon';
import { injectable, inject } from 'tsyringe';

import InvalidSessionTokenException from '~/exceptions/InvalidSessionTokenException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import type { IMiddleware } from '~/types';

import ISessionCacheProvider from '@users/providers/SessionCacheProvider/ISessionCacheProvider';
import ISessionTokenProvider from '@users/providers/SessionTokenProvider/ISessionTokenProvider';
import IUserCacheProvider from '@users/providers/UserCacheProvider/IUserCacheProvider';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

@injectable()
export default class AuthMiddleware implements IMiddleware {
  constructor(
    @inject('SessionTokenProvider')
    private sessionTokenProvider: ISessionTokenProvider,

    @inject('SessionCacheProvider')
    private sessionCacheProvider: ISessionCacheProvider,

    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,

    @inject('UserCacheProvider')
    private userCacheProvider: IUserCacheProvider,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async handle(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { authorization } = request.headers;

    if (!authorization) throw new InvalidSessionTokenException();

    const { id, hash } = await this.sessionTokenProvider.parsePublicToken(authorization);

    const hasCachedSession = await this.sessionCacheProvider.exists(id);

    const session = hasCachedSession
      ? await this.sessionCacheProvider.recover(id)
      : await this.sessionRepository.findById(id);

    if (!session) throw new ResourceNotFoundException('Session');

    if (session.accessToken !== hash) throw new InvalidSessionTokenException();

    if (session.expiresAt && session.expiresAt < DateTime.local()) {
      throw new InvalidSessionTokenException();
    }

    if (!hasCachedSession) await this.sessionCacheProvider.save(id, session);

    const hasCachedUser = await this.userCacheProvider.exists(session.userId);

    const user = hasCachedUser
      ? await this.userCacheProvider.recover(session.userId)
      : await this.userRepository.findById(session.userId);

    if (!user) throw new ResourceNotFoundException('User');

    if (!hasCachedSession) await this.userCacheProvider.save(session.userId, user);

    request.user = user;

    next();
  }
}
