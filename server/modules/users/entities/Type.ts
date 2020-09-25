import { DateTime } from 'luxon';

import { Column, DateColumn } from '~/utils/transformers';

export default class Type {
  @Column('id')
  id!: string;

  @Column('name')
  name!: string;

  @Column('position')
  position!: number;

  @Column('permissions')
  permissions!: string;

  @DateColumn('created_at')
  createdAt!: DateTime;

  @DateColumn('updated_at')
  updatedAt!: DateTime;
}
