import ICreateUserDTO from '@users/dtos/ICreateUserDTO';
import User from '@users/entities/User';

export default interface IUserRepository {
  findById(id: string): Promise<User>;

  findByEmail(email: string): Promise<User>;

  create(data: ICreateUserDTO): Promise<User>;

  clear(): Promise<void>;
}
