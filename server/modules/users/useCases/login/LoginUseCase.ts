import { injectable, inject } from 'tsyringe';

import InvalidCredentialsException from '~/exceptions/InvalidCredentialsException';
import type { IUseCase } from '~/types';

import IHashProvider from '@users/providers/HashProvider/IHashProvider';
import PublicSessionDTO from '@users/providers/SessionProvider/dtos/PublicSessionDTO';
import ISessionProvider from '@users/providers/SessionProvider/ISessionProvider';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import LoginDTO from './LoginDTO';

@injectable()
export default class LoginUseCase implements IUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('SessionProvider')
    private sessionProvider: ISessionProvider,

    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async execute({ email, password }: LoginDTO): Promise<PublicSessionDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsException('Uid');

    const check = await this.hashProvider.verify(user.password, password);

    if (!check) throw new InvalidCredentialsException('Password');

    const accessToken = await this.sessionProvider.generateOpaqueToken();
    const refreshToken = accessToken.expiresAt
      && await this.sessionProvider.generateOpaqueToken(false);

    const session = await this.sessionRepository.create({
      accessToken: accessToken.hash,
      refreshToken: refreshToken?.hash,
      userId: user.id,
    });

    return this.sessionProvider.generatePublicSession(session.id, accessToken, refreshToken);
  }
}
