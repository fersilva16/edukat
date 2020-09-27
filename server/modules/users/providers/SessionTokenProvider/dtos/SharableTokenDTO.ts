import { Property } from '~/decorators';

export default class SharableTokenDTO {
  @Property('type')
  type!: string;

  @Property('token')
  token!: string;

  @Property('expires_at', { outOnly: true })
  expiresAt?: string;
}
