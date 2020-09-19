import IPublicTokenDTO from './dtos/IPublicTokenDTO';
import ITokenDTO from './dtos/ITokenDTO';
import SharableTokenDTO from './dtos/SharableTokenDTO';

export default interface ISessionTokenProvider {
  generateToken(): Promise<ITokenDTO>;

  generatePublicToken(token: ITokenDTO, id: string): SharableTokenDTO;

  parsePublicToken(token: string): Promise<IPublicTokenDTO>;
}
