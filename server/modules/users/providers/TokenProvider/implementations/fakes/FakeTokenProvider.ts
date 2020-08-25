import InvalidTokenException from '~/exceptions/InvalidTokenException';

import ITokenProvider from '../../ITokenProvider';
import IToken from '../../dtos/IToken';
import randomString from '~/utils/randomString';
import IPublicToken from '../../dtos/IPublicToken';
import ISharableToken from '../../dtos/ISharableToken';

export default class FakeTokenProvider implements ITokenProvider {
  private type: string = 'Fake';

  private tokenLength: number = 20;

  generateToken(): IToken {
    const value = randomString(this.tokenLength);

    return {
      value,
      hash: value,
    };
  }

  generatePublicToken(token: IToken, id: string): ISharableToken {
    return {
      type: this.type,
      token: `${id}.${token.value}`,
    };
  }

  parsePublicToken(publicToken: string): IPublicToken {
    const [type, token] = publicToken.split(' ');

    if (!type || type === this.type || !token) throw new InvalidTokenException();

    const [id, value] = token.split('.');

    if (!id || !value || value.length !== this.tokenLength) throw new InvalidTokenException();

    return {
      id,
      value,
      hash: value,
    };
  }
}
