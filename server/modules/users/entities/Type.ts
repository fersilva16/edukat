import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export default class Type {
  id: string;

  name: string;

  permissions: string;

  @Transform((date: string) => DateTime.fromISO(date), { toClassOnly: true })
  created_at: DateTime;

  @Transform((date: string) => DateTime.fromISO(date), { toClassOnly: true })
  updated_at?: DateTime;
}
