import { DateTime, DurationObject } from 'luxon';
import { injectable, inject } from 'tsyringe';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import base64Url from '~/utils/base64Url';
import random from '~/utils/random';

import IHashProvider from '../../HashProvider/IHashProvider';
import IPublicTokenDTO from '../dtos/IPublicTokenDTO';
import ISharableTokenDTO from '../dtos/ISharableTokenDTO';
import ITokenDTO from '../dtos/ITokenDTO';
import ISessionTokenProvider from '../ISessionTokenProvider';

@injectable()
export default class OpaqueSessionTokenProvider implements ISessionTokenProvider {
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

  async generateToken(): Promise<ITokenDTO> {
    const value = random.base64(this.tokenLength);
    const hash = await this.sha256HashProvider.hash(value);

    return {
      value,
      hash,
      expiresAt: this.getExpiresAt(),
    };
  }

  generatePublicToken(token: ITokenDTO, id: string): ISharableTokenDTO {
    return {
      type: this.type,
      token: `${base64Url.encode(id)}.${token.value}`,
      expiresAt: token.expiresAt?.toISO(),
    };
  }

  async parsePublicToken(bearerToken: string): Promise<IPublicTokenDTO> {
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
