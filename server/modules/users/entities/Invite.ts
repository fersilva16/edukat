import { DateTime } from 'luxon';

import { Column, DateColumn } from '~/decorators';

export default class Invite {
  @Column('id')
  id!: string;

  @Column('uses')
  uses!: number;

  @Column('max_uses')
  maxUses?: number;

  @Column('type_id')
  typeId!: string;

  @Column('owner_id')
  ownerId!: string;

  @DateColumn('expires_at')
  expiresAt?: DateTime;

  @DateColumn('created_at')
  createdAt!: DateTime;

  @DateColumn('updated_at')
  updatedAt!: DateTime;
}
