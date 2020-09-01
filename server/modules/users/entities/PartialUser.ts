import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export default class PartialUser {
  id: string;

  firstname?: string;

  lastname?: string;

  username?: string;

  email: string;

  type_id: string;

  @Transform((date: string) => DateTime.fromISO(date), { toClassOnly: true })
  created_at: DateTime;

  @Transform((date: string) => DateTime.fromISO(date), { toClassOnly: true })
  updated_at: DateTime;
}
