import { injectable, inject } from 'tsyringe';

import InvalidCredentialsException from '~/exceptions/InvalidCredentialsException';
import type { IUseCase } from '~/types';

import IRememberMeTokenDTO from '@users/dtos/IRememberMeTokenDTO';
import IHashProvider from '@users/providers/HashProvider/IHashProvider';
import ISessionProvider from '@users/providers/SessionProvider/ISessionProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import LoginDTO from './LoginDTO';
import LoginResultDTO from './LoginResultDTO';

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

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) {}

  async execute({ email, password, rememberMe }: LoginDTO): Promise<LoginResultDTO> {
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
      expiresAt: accessToken?.expiresAt,
      userId: user.id,
    });

    const publicSession = this.sessionProvider.generatePublicSession(
      session.id,
      accessToken,
      refreshToken,
    );

    if (rememberMe) {
      const rememberMeToken = user.rememberMeToken
        || await this.tokenProvider.generateToken<IRememberMeTokenDTO>({ id: user.id }, false);

      if (!user.rememberMeToken) await this.userRepository.update(user.id, { rememberMeToken });

      return {
        ...publicSession,

        rememberMeToken,
      };
    }

    return publicSession;
  }
}
