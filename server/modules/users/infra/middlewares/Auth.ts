import { Request, Response, NextFunction } from 'express';
import { injectable, inject } from 'tsyringe';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IMiddleware from '~/types/IMiddleware';

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

    if (!authorization) throw new InvalidTokenException();

    const { id, hash } = await this.sessionTokenProvider.parsePublicToken(authorization);

    const hasCachedSession = await this.sessionCacheProvider.exists(id);

    const session = hasCachedSession
      ? await this.sessionCacheProvider.recover(id)
      : await this.sessionRepository.findById(id);

    if (!session) throw new ResourceNotFoundException('Session');

    if (session.token !== hash) throw new InvalidTokenException();

    if (!hasCachedSession) await this.sessionCacheProvider.save(id, session);

    const hasCachedUser = await this.userCacheProvider.exists(session.user_id);

    const user = hasCachedUser
      ? await this.userCacheProvider.recover(session.user_id)
      : await this.userRepository.findById(session.user_id);

    if (!user) throw new ResourceNotFoundException('User');

    if (!hasCachedSession) await this.userCacheProvider.save(session.user_id, user);

    request.user = user;

    next();
  }
}
