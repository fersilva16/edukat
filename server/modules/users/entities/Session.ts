import { DateTime } from 'luxon';

import { Column, DateColumn } from '~/utils/transformers';

export default class Session {
  @Column('id')
  id!: string;

  @Column('token')
  token!: string;

  @Column('user_id')
  userId!: string;

  @DateColumn('created_at')
  createdAt!: DateTime;

  @DateColumn('expires_at')
  expiresAt?: DateTime;
}
