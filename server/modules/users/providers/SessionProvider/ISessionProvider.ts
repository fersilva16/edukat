import IOpaqueTokenDTO from './dtos/IOpaqueTokenDTO';
import IPublicOpaqueTokenDTO from './dtos/IPublicOpaqueTokenDTO';
import PublicSessionDTO from './dtos/PublicSessionDTO';

export default interface ISessionProvider {
  generateOpaqueToken(hasExpiresAt?: boolean): Promise<IOpaqueTokenDTO>;

  generatePublicSession(
    sessionId: string,
    accessToken: IOpaqueTokenDTO,
    refreshToken?: IOpaqueTokenDTO,
  ): PublicSessionDTO;

  parsePublicToken(publicToken: string): Promise<IPublicOpaqueTokenDTO>;

  parseBearerToken(bearerToken: string): Promise<IPublicOpaqueTokenDTO>;
}
