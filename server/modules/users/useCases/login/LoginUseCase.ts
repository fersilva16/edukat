import { injectable, inject } from 'tsyringe';

import InvalidCredentialsException from '~/exceptions/InvalidCredentialsException';
import SharableTokenDTO from '~/modules/users/providers/SessionTokenProvider/dtos/SharableTokenDTO';
import IUseCase from '~/types/IUseCase';

import IHashProvider from '@users/providers/HashProvider/IHashProvider';
import ISessionTokenProvider from '@users/providers/SessionTokenProvider/ISessionTokenProvider';
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

    @inject('SessionTokenProvider')
    private sessionTokenProvider: ISessionTokenProvider,

    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async execute({ email, password }: LoginDTO): Promise<SharableTokenDTO> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new InvalidCredentialsException('Uid');

    const check = await this.hashProvider.verify(user.password, password);

    if (!check) throw new InvalidCredentialsException('Password');

    const token = await this.sessionTokenProvider.generateToken();

    const session = await this.sessionRepository.create({
      token: token.hash,
      userId: user.id,
    });

    const publicToken = this.sessionTokenProvider.generatePublicToken(token, session.id);

    return publicToken;
  }
}
