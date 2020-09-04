import InvalidTokenException from '~/exceptions/InvalidTokenException';
import base64Url from '~/utils/base64Url';

import ITokenProvider from '../../ITokenProvider';

export default class FakeTokenProvider implements ITokenProvider {
  async generateToken<T extends object>(payload?: T): Promise<string> {
    return base64Url.encode(JSON.stringify(payload));
  }

  async parseToken<T extends object>(token: string): Promise<T> {
    try {
      return JSON.parse(base64Url.decode(token));
    } catch {
      throw new InvalidTokenException();
    }
  }
}
