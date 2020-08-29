import { injectable, inject } from 'tsyringe';

import ISharableToken from '@users/providers/TokenProvider/dtos/ISharableToken';
import IHashProvider from '@users/providers/HashProvider/IHashProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';

import BadRequestException from '~/exceptions/BadRequestException';
import InvalidCredentialsException from '~/exceptions/InvalidCredentialsException';
import ICreateSessionDTO from './CreateSessionDTO';

@injectable()
export default class CreateSessionUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async execute({ email, username, password }: ICreateSessionDTO): Promise<ISharableToken> {
    if (email && username) {
      throw new BadRequestException('Only one of: email, username', 'UID_INVALID');
    }

    const user = email
      ? await this.userRepository.findByEmail(email)
      : await this.userRepository.findByUsername(username);

    if (!user) throw new InvalidCredentialsException('Uid');

    const check = await this.hashProvider.verify(user.password, password);

    if (!check) throw new InvalidCredentialsException('Password');

    const token = await this.tokenProvider.generateToken();

    const session = await this.sessionRepository.create({
      token: token.hash,
      userId: user.id,
    });

    const publicToken = this.tokenProvider.generatePublicToken(token, session.id);

    return publicToken;
  }
}
