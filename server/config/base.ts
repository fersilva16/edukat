import { KeyofFlags } from '@users/dtos/Flags';
import ICreateTypeDTO from '@users/dtos/ICreateTypeDTO';
import ICreateUserDTO from '@users/dtos/ICreateUserDTO';

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
    firstname: process.env.ADMIN_FIRSTNAME || 'Admin',
    lastname: process.env.ADMIN_LASTNAME || 'Admin',

    username: process.env.ADMIN_USERNAME || 'admin',
    email: process.env.ADMIN_EMAIL || 'admin@edukat.com.br',

    password: process.env.ADMIN_PASSWORD || 'admin',
  },

  types: {
    admin: {
      name: process.env.ADMIN_TYPE_NAME || 'Administrator',
      flags: ['ADMINISTRATOR'],
    },

    teacher: {
      name: process.env.TEACHER_TYPE_NAME || 'Teacher',
      flags: [],
    },

    student: {
      name: process.env.STUDENT_TYPE_NAME || 'Student',
      flags: [],
    },

    parent: {
      name: process.env.PARENT_TYPE_NAME || 'Parent',
      flags: [],
    },
  },
};

export default baseConfig;
