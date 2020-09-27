import { DateTime } from 'luxon';

import { Column, DateColumn } from '~/decorators';

export default class PartialUser {
  @Column('id')
  id!: string;

  @Column('firstname')
  firstname?: string;

  @Column('lastname')
  lastname?: string;

  @Column('email')
  email!: string;

  @Column('type_id')
  typeId!: string;

  @DateColumn('created_at')
  createdAt!: DateTime;

  @DateColumn('updated_at')
  updatedAt!: DateTime;
}
