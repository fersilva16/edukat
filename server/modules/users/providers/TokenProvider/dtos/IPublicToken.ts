import IToken from './IToken';

export default interface IPublicToken extends Omit<IToken, 'expiresAt'> {
  id: string;
}
