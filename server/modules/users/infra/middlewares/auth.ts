import { Request, Response, NextFunction } from 'express';
import { container } from 'tsyringe';

import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';

const tokenProvider = container.resolve<ITokenProvider>('TokenProvider');
const sessionRepository = container.resolve<ISessionRepository>('SessionProvider');
const userRepository = container.resolve<IUserRepository>('UserProvider');

export default async function auth(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = request.headers;

  const { id, hash } = await tokenProvider.parsePublicToken(authorization);

  const session = await sessionRepository.findById(id);

  if (session.token !== hash) throw new InvalidTokenException();

  const user = await userRepository.findById(session.user_id);

  if (!user) throw new ResourceNotFoundException('User');

  request.user = user;

  next();
}
