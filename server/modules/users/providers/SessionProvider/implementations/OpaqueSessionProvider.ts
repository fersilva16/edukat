import { DateTime } from 'luxon';
import { inject, injectable } from 'tsyringe';

import authConfig from '~/config/auth';
import InvalidSessionTokenException from '~/exceptions/InvalidSessionTokenException';
import base64Url from '~/utils/base64Url';
import random from '~/utils/random';
import transform from '~/utils/transform';

import IHashProvider from '@users/providers/HashProvider/IHashProvider';

import IOpaqueTokenDTO from '../dtos/IOpaqueTokenDTO';
import IPublicOpaqueTokenDTO from '../dtos/IPublicOpaqueTokenDTO';
import PublicSessionDTO from '../dtos/PublicSessionDTO';
import ISessionProvider from '../ISessionProvider';

@injectable()
export default class OpaqueSessionProvider implements ISessionProvider {
  constructor(
    @inject('SHA256HashProvider')
    private sha256HashProvider: IHashProvider,
  ) {}

  private type: string = 'Bearer';

  async generateOpaqueToken(hasExpiresAt: boolean = true): Promise<IOpaqueTokenDTO> {
    const value = random.base64(authConfig.tokenLength);
    const hash = await this.sha256HashProvider.hash(value);

    return {
      value,
      hash,
      expiresAt: hasExpiresAt ? DateTime.local().plus(authConfig.expirationTime) : undefined,
    };
  }

  generatePublicSession(
    sessionId: string,
    accessToken: IOpaqueTokenDTO,
    refreshToken?: IOpaqueTokenDTO,
  ): PublicSessionDTO {
    const encodedSessionId = base64Url.encode(sessionId);

    return transform.toClass(PublicSessionDTO, {
      type: this.type,
      accessToken: `${encodedSessionId}.${accessToken.value}`,
      refreshToken: refreshToken ?? `${encodedSessionId}.${refreshToken!.value}`,
      expiresAt: accessToken.expiresAt?.toISO()!,
    });
  }

  async parsePublicToken(publicToken: string): Promise<IPublicOpaqueTokenDTO> {
    const [encodedSessionId, token] = publicToken.split('.');

    if (!encodedSessionId || !token) throw new InvalidSessionTokenException();

    const sessionId = base64Url.decode(encodedSessionId, true);

    if (!sessionId || token.length !== authConfig.tokenLength) {
      throw new InvalidSessionTokenException();
    }

    const hash = await this.sha256HashProvider.hash(token);

    return {
      sessionId,
      value: token,
      hash,
    };
  }

  parseBearerToken(bearerToken: string): Promise<IPublicOpaqueTokenDTO> {
    const [type, publicToken] = bearerToken.split(' ');

    if (!type || type !== this.type || !publicToken) throw new InvalidSessionTokenException();

    return this.parsePublicToken(publicToken);
  }
}
