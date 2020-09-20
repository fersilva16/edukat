import Type from '../modules/users/entities/Type';
import User from '../modules/users/entities/User';

declare module 'express' {
  export interface Request {
    user?: User & { type?: Type };
    data?: any;
  }
}
