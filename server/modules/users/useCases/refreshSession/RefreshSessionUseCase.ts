import { injectable, inject } from 'tsyringe';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import IUseCase from '~/types/IUseCase';

import PublicSessionDTO from '@users/providers/SessionProvider/dtos/PublicSessionDTO';
import ISessionProvider from '@users/providers/SessionProvider/ISessionProvider';
import ISessionRepository from '@users/repositories/SessionRepository/ISessionRepository';

import RefreshSessionDTO from './RefreshSessionDTO';

@injectable()
export default class RefreshSessionUseCase implements IUseCase {
  constructor(
    @inject('SessionProvider')
    private sessionProvider: ISessionProvider,

    @inject('SessionRepository')
    private sessionRepository: ISessionRepository,
  ) {}

  async execute(data: RefreshSessionDTO): Promise<PublicSessionDTO> {
    const { sessionId, hash } = await this.sessionProvider.parsePublicToken(data.refreshToken);

    const session = await this.sessionRepository.findById(sessionId);

    if (!session || !session.refreshToken || session.refreshToken !== hash) {
      throw new InvalidTokenException();
    }

    const accessToken = await this.sessionProvider.generateOpaqueToken();
    const refreshToken = await this.sessionProvider.generateOpaqueToken(false);

    await this.sessionRepository.update(session.id, {
      accessToken: accessToken.hash,
      refreshToken: refreshToken.hash,
      expiresAt: accessToken!.expiresAt,
    });

    return this.sessionProvider.generatePublicSession(session.id, accessToken, refreshToken);
  }
}
