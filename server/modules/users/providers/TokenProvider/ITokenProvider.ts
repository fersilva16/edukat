import IToken from './dtos/IToken';
import IPublicToken from './dtos/IPublicToken';
import ISharableToken from './dtos/ISharableToken';

export default interface ITokenProvider {
  generateToken(): Promise<IToken>;

  generatePublicToken(token: IToken, id: string): ISharableToken;

  parsePublicToken(token: string): Promise<IPublicToken>;
}
