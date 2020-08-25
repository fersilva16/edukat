import { Exclude } from 'class-transformer';
import { DateTime } from 'luxon';

export default class User {
  id: string;

  firstname: string;

  lastname: string;

  username: string;

  email: string;

  @Exclude({ toPlainOnly: true })
  password: string;

  created_at: DateTime;

  updated_at: DateTime;
}
