import InvalidTokenException from '~/exceptions/InvalidTokenException';

import ITokenProvider from '../../ITokenProvider';
import ITokenDTO from '../../dtos/ITokenDTO';
import randomString from '~/utils/randomString';
import IPublicTokenDTO from '../../dtos/IPublicTokenDTO';
import ISharableTokenDTO from '../../dtos/ISharableTokenDTO';

export default class FakeTokenProvider implements ITokenProvider {
  private type: string = 'Fake';

  private tokenLength: number = 20;

  async generateToken(): Promise<ITokenDTO> {
    const value = randomString(this.tokenLength);

    return {
      value,
      hash: value,
    };
  }

  generatePublicToken(token: ITokenDTO, id: string): ISharableTokenDTO {
    return {
      type: this.type,
      token: `${id}.${token.value}`,
    };
  }

  async parsePublicToken(publicToken: string): Promise<IPublicTokenDTO> {
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
