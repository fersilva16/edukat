import { DateTime } from 'luxon';

export default interface ICreateSessionDTO {
  token: string;

  userId: string;

  expiresAt: DateTime;
}
