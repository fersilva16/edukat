import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export default class Type {
  id: string;

  name: string;

  permissions: string;

  @Transform((date: Date) => DateTime.fromJSDate(date), { toClassOnly: true })
  created_at: DateTime;

  @Transform((date: Date) => DateTime.fromJSDate(date), { toClassOnly: true })
  updated_at?: DateTime;
}
