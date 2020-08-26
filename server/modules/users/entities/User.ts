import { Exclude, Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export default class User {
  id: string;

  firstname: string;

  lastname: string;

  username: string;

  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @Transform((date: string) => DateTime.fromISO(date), { toClassOnly: true })
  created_at: DateTime;

  @Transform((date: string) => DateTime.fromISO(date), { toClassOnly: true })
  updated_at: DateTime;
}
