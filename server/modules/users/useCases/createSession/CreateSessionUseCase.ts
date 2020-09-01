import { injectable, inject } from 'tsyringe';

import IHashProvider from '@users/providers/HashProvider/IHashProvider';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';
import ISessionTokenProvider from '~/modules/users/providers/SessionTokenProvider/ISessionTokenProvider';
import ISharableTokenDTO from '~/modules/users/providers/SessionTokenProvider/dtos/ISharableTokenDTO';

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

    @inject('SessionTokenProvider')
    private sessionTokenProvider: ISessionTokenProvider,

    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async execute({ email, username, password }: ICreateSessionDTO): Promise<ISharableTokenDTO> {
    if (email && username) {
      throw new BadRequestException('Only one of: email, username', 'UID_INVALID');
    }

    const user = email
      ? await this.userRepository.findByEmail(email)
      : await this.userRepository.findByUsername(username);

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
