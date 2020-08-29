import { injectable, inject } from 'tsyringe';
import { DateTime, DurationObject } from 'luxon';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import base64Url from '~/utils/base64Url';
import randomString from '~/utils/randomString';

import ITokenProvider from '../ITokenProvider';
import IToken from '../dtos/IToken';
import IPublicToken from '../dtos/IPublicToken';
import ISharableToken from '../dtos/ISharableToken';
import IHashProvider from '../../HashProvider/IHashProvider';

@injectable()
export default class OpaqueTokenProvider implements ITokenProvider {
  constructor(
    @inject('SHA256HashProvider')
    private sha256HashProvider: IHashProvider,
  ) {}

  private type: string = 'Bearer';

  private tokenLength: number = 60;

  private expirationTime: DurationObject = undefined;

  private getExpiresAt(): DateTime {
    return this.expirationTime && DateTime.local().plus(this.expirationTime);
  }

  async generateToken(): Promise<IToken> {
    const value = randomString(this.tokenLength);
    const hash = await this.sha256HashProvider.hash(value);

    return {
      value,
      hash,
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

  async parsePublicToken(bearerToken: string): Promise<IPublicToken> {
    const [type, token] = bearerToken.split(' ');

    if (!type || type !== this.type || !token) throw new InvalidTokenException();

    const [encodedId, value] = token.split('.');

    if (!encodedId || !value) throw new InvalidTokenException();

    const id = base64Url.decode(encodedId, true);

    if (!id || value.length !== this.tokenLength) throw new InvalidTokenException();

    const hash = await this.sha256HashProvider.hash(value);

    return {
      id,
      value,
      hash,
    };
  }
}
