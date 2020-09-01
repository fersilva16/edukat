import ITokenDTO from './dtos/ITokenDTO';
import IPublicTokenDTO from './dtos/IPublicTokenDTO';
import ISharableTokenDTO from './dtos/ISharableTokenDTO';

export default interface ISessionTokenProvider {
  generateToken(): Promise<ITokenDTO>;

  generatePublicToken(token: ITokenDTO, id: string): ISharableTokenDTO;

  parsePublicToken(token: string): Promise<IPublicTokenDTO>;
}
