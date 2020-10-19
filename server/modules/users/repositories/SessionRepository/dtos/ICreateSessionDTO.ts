import { DateTime } from 'luxon';

export default interface ICreateSessionDTO {
  accessToken: string;

  refreshToken?: string;

  userId: string;

  expiresAt?: DateTime;
}
