import { DateTime } from 'luxon';

import { Column, DateColumn } from '~/decorators';

export default class Session {
  @Column('id')
  id!: string;

  @Column('access_token')
  accessToken!: string;

  @Column('refresh_token')
  refreshToken?: string;

  @Column('user_id')
  userId!: string;

  @DateColumn('created_at')
  createdAt!: DateTime;

  @DateColumn('expires_at')
  expiresAt?: DateTime;
}
