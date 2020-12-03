import { Property } from '~/decorators';

import PublicSessionDTO from '@users/providers/SessionProvider/dtos/PublicSessionDTO';

export default class LoginResultDTO extends PublicSessionDTO {
  @Property('remember_me_token', { outOnly: true })
  rememberMeToken?: string;
}
