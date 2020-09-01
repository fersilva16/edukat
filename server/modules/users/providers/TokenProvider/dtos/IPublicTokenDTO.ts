import ITokenDTO from './ITokenDTO';

export default interface IPublicTokenDTO extends Omit<ITokenDTO, 'expiresAt'> {
  id: string;
}
