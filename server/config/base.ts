import env from '~/utils/env';

import { KeyofFlags } from '@users/dtos/Flags';
import ICreateTypeDTO from '@users/repositories/TypeRepository/dtos/ICreateTypeDTO';
import ICreateUserDTO from '@users/repositories/UserRepository/dtos/ICreateUserDTO';

export type TypeWithFlags = Omit<ICreateTypeDTO, 'permissions'> & {
  flags: KeyofFlags[];
};

type BaseConfig = {
  admin: Omit<ICreateUserDTO, 'typeId'>;

  types: {
    admin: TypeWithFlags;
    teacher: TypeWithFlags;
    student: TypeWithFlags;
    parent: TypeWithFlags;
  };
};

const baseConfig: BaseConfig = {
  admin: {
    firstname: env.string('ADMIN_FIRSTNAME', 'Admin')!,
    lastname: env.string('ADMIN_LASTNAME', 'Admin')!,

    email: env.string('ADMIN_EMAIL', 'admin@edukat.com.br')!,

    password: env.string('ADMIN_PASSWORD', 'admin')!,
  },

  types: {
    admin: {
      name: env.string('ADMIN_TYPE_NAME', 'Administrator')!,
      position: 0,
      flags: ['ADMINISTRATOR'],
    },

    teacher: {
      name: env.string('TEACHER_TYPE_NAME', 'Teacher')!,
      position: 1,
      flags: [],
    },

    student: {
      name: env.string('STUDENT_TYPE_NAME', 'Student')!,
      position: 2,
      flags: [],
    },

    parent: {
      name: env.string('PARENT_TYPE_NAME', 'Parent')!,
      position: 3,
      flags: [],
    },
  },
};

export default baseConfig;
