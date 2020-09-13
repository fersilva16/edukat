import { Transform } from 'class-transformer';
import { DateTime } from 'luxon';

export default class PartialUser {
  id: string;

  firstname?: string;

  lastname?: string;

  email: string;

  type_id: string;

  @Transform((date: Date) => DateTime.fromJSDate(date), { toClassOnly: true })
  created_at: DateTime;

  @Transform((date: Date) => DateTime.fromJSDate(date), { toClassOnly: true })
  updated_at: DateTime;
}
