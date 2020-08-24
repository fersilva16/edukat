import { createHash } from 'crypto';
import { DateTime, DurationObject } from 'luxon';

import base64Url from '~/utils/base64Url';
import randomString from '~/utils/randomString';

import ITokenProvider from '../ITokenProvider';
import IToken from '../dtos/IToken';
import IPublicToken from '../dtos/IPublicToken';
import InvalidTokenException from '../../../../../exceptions/InvalidTokenException';
import ISharableToken from '../dtos/ISharableToken';

export default class OpaqueTokenProvider implements ITokenProvider {
  private type: string = 'Bearer';

  private tokenLength: number = 60;

  private expirationTime: DurationObject = undefined;

  private generateHash(value: string): string {
    return createHash('sha256').update(value).digest('hex');
  }

  private getExpiresAt(): DateTime {
    return this.expirationTime && DateTime.local().plus(this.expirationTime);
  }

  generateToken(): IToken {
    const value = randomString(this.tokenLength);

    return {
      value,
      hash: this.generateHash(value),
      expiresAt: this.getExpiresAt(),
    };
  }

  generatePublicToken(token: IToken, id: string): ISharableToken {
    return {
      type: this.type,
      token: `${base64Url.encode(id)}.${token.value}`,
      expiresAt: token.expiresAt?.toISO(),
    };
  }

  parsePublicToken(bearerToken: string): IPublicToken {
    const [type, token] = bearerToken.split(' ');

    if (!type || type !== this.type || !token) throw new InvalidTokenException();

    const [encodedId, value] = token.split('.');

    if (!encodedId || !value) throw new InvalidTokenException();

    const id = base64Url.decode(encodedId, true);

    if (!id || value.length !== this.tokenLength) throw new InvalidTokenException();

    return {
      id,
      value,
      hash: this.generateHash(value),
    };
  }
}
