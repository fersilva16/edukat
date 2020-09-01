import jwt from 'jsonwebtoken';

import appConfig from '~/config/app';
import InvalidTokenException from '~/exceptions/InvalidTokenException';

import ITokenProvider from '../ITokenProvider';

export default class JWTTokenProvider implements ITokenProvider {
  private expiresIn = 86400000;

  async generateToken<T extends object>(payload?: T): Promise<string> {
    return jwt.sign(payload, appConfig.secret, {
      expiresIn: this.expiresIn,
    });
  }

  async parseToken<T extends object>(token: string): Promise<T> {
    try {
      return jwt.verify(token, appConfig.secret) as T;
    } catch {
      throw new InvalidTokenException();
    }
  }
}
