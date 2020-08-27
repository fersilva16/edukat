import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export default class Session {
  id: string;

  token: string;

  user_id: string;

  @Transform((date: string) => DateTime.fromISO(date), { toClassOnly: true })
  created_at: DateTime;

  @Transform((date: string) => DateTime.fromISO(date), { toClassOnly: true })
  expires_at?: DateTime;
}
