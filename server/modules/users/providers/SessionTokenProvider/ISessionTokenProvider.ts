import IPublicTokenDTO from './dtos/IPublicTokenDTO';
import ISharableTokenDTO from './dtos/ISharableTokenDTO';
import ITokenDTO from './dtos/ITokenDTO';

export default interface ISessionTokenProvider {
  generateToken(): Promise<ITokenDTO>;

  generatePublicToken(token: ITokenDTO, id: string): ISharableTokenDTO;

  parsePublicToken(token: string): Promise<IPublicTokenDTO>;
}
