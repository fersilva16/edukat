import { DateTime } from 'luxon';

import { Column, SensitiveColumn, DateColumn } from '~/decorators';

export default class User {
  @Column('id')
  id!: string;

  @Column('firstname')
  firstname!: string;

  @Column('lastname')
  lastname!: string;

  @Column('email')
  email!: string;

  @SensitiveColumn('password')
  password!: string;

  @Column('remember_me_token')
  rememberMeToken?: string;

  @Column('type_id')
  typeId!: string;

  @DateColumn('created_at')
  createdAt!: DateTime;

  @DateColumn('updated_at')
  updatedAt!: DateTime;
}
