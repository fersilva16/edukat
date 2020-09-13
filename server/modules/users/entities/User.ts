import { Exclude, Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export default class User {
  id: string;

  firstname: string;

  lastname: string;

  email: string;

  type_id: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  @Transform((date: Date) => DateTime.fromJSDate(date), { toClassOnly: true })
  created_at: DateTime;

  @Transform((date: Date) => DateTime.fromJSDate(date), { toClassOnly: true })
  updated_at: DateTime;
}
