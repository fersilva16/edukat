import { Property } from '~/decorators';

export default class PublicSessionDTO {
  @Property('type', { outOnly: true })
  type!: string;

  @Property('access_token', { outOnly: true })
  accessToken!: string;

  @Property('refresh_token', { outOnly: true })
  refreshToken?: string;

  @Property('expires_at', { outOnly: true })
  expiresAt?: string;
}
