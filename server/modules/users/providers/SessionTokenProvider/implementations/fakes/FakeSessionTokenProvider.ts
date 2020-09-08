import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ramdom from '~/utils/random';

import IPublicTokenDTO from '../../dtos/IPublicTokenDTO';
import ISharableTokenDTO from '../../dtos/ISharableTokenDTO';
import ITokenDTO from '../../dtos/ITokenDTO';
import ISessionTokenProvider from '../../ISessionTokenProvider';

export default class FakeSessionTokenProvider implements ISessionTokenProvider {
  private type: string = 'Fake';

  private tokenLength: number = 20;

  async generateToken(): Promise<ITokenDTO> {
    const value = ramdom.base64(this.tokenLength);

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
