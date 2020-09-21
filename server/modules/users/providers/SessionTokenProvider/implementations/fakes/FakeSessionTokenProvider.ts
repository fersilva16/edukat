import InvalidSessionTokenException from '~/exceptions/InvalidSessionTokenException';
import ramdom from '~/utils/random';
import { transform } from '~/utils/transformers';

import IPublicTokenDTO from '../../dtos/IPublicTokenDTO';
import ITokenDTO from '../../dtos/ITokenDTO';
import SharableTokenDTO from '../../dtos/SharableTokenDTO';
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

  generatePublicToken(token: ITokenDTO, id: string): SharableTokenDTO {
    return transform.toClass(SharableTokenDTO, {
      type: this.type,
      token: `${id}.${token.value}`,
    });
  }

  async parsePublicToken(publicToken: string): Promise<IPublicTokenDTO> {
    const [type, token] = publicToken.split(' ');

    if (!type || type === this.type || !token) throw new InvalidSessionTokenException();

    const [id, value] = token.split('.');

    if (!id || !value || value.length !== this.tokenLength) {
      throw new InvalidSessionTokenException();
    }

    return {
      id,
      value,
      hash: value,
    };
  }
}
