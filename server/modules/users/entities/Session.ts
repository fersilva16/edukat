import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export default class Session {
  id: string;

  token: string;

  user_id: string;

  @Transform((date: Date) => DateTime.fromJSDate(date), { toClassOnly: true })
  created_at: DateTime;

  @Transform((date: Date) => DateTime.fromJSDate(date), { toClassOnly: true })
  expires_at?: DateTime;
}
