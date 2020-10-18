import { DateTime } from 'luxon';

import authConfig from '~/config/auth';
import InvalidSessionTokenException from '~/exceptions/InvalidSessionTokenException';
import random from '~/utils/random';
import transform from '~/utils/transform';

import IOpaqueTokenDTO from '../../dtos/IOpaqueTokenDTO';
import IPublicOpaqueTokenDTO from '../../dtos/IPublicOpaqueTokenDTO';
import PublicSessionDTO from '../../dtos/PublicSessionDTO';
import ISessionProvider from '../../ISessionProvider';

export default class FakeSessionProvider implements ISessionProvider {
  private type: string = 'Fake';

  async generateOpaqueToken(hasExpiresAt: boolean = true): Promise<IOpaqueTokenDTO> {
    const value = random.base64(authConfig.tokenLength);

    return {
      value,
      hash: value,
      expiresAt: hasExpiresAt ? DateTime.local().plus(authConfig.expirationTime) : undefined,
    };
  }

  generatePublicSession(
    sessionId: string,
    accessToken: IOpaqueTokenDTO,
    refreshToken?: IOpaqueTokenDTO,
  ): PublicSessionDTO {
    return transform.toClass(PublicSessionDTO, {
      type: this.type,
      accessToken: `${sessionId}.${accessToken.value}`,
      refreshToken: refreshToken ?? `${sessionId}.${refreshToken!.value}`,
      expiresAt: accessToken.expiresAt?.toISO()!,
    });
  }

  async parsePublicToken(publicToken: string): Promise<IPublicOpaqueTokenDTO> {
    const [sessionId, token] = publicToken.split('.');

    if (!sessionId || !token || token.length !== authConfig.tokenLength) {
      throw new InvalidSessionTokenException();
    }

    return {
      sessionId,
      value: token,
      hash: token,
    };
  }

  parseBearerToken(bearerToken: string): Promise<IPublicOpaqueTokenDTO> {
    const [type, publicToken] = bearerToken.split(' ');

    if (!type || type !== this.type || !publicToken) throw new InvalidSessionTokenException();

    return this.parsePublicToken(publicToken);
  }
}
