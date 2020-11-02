import User from '@users/entities/User';

import ICreateUserDTO from './dtos/ICreateUserDTO';

export default interface IUserRepository {
  findById(id: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  create(data: ICreateUserDTO): Promise<User>;

  update(id: string, data: Partial<ICreateUserDTO>): Promise<void>;

  clear(): Promise<void>;
}
