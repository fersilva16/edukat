import { IsString, IsNotEmpty, Property } from '~/decorators';

export default class RefreshSessionDTO {
  @IsString()
  @IsNotEmpty()
  @Property('refresh_token')
  refreshToken!: string;
}
