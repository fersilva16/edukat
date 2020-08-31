import User from '../modules/users/entities/User';

declare module 'express' {
  export interface Request {
    user?: User;
  }
}
