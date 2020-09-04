import ICreatePartialUserDTO from '@users/dtos/ICreatePartialUserDTO';
import PartialUser from '@users/entities/PartialUser';

export default interface IPartialUserRepository {
  findById(id: string): Promise<PartialUser>;

  findByEmail(email: string): Promise<PartialUser>;

  create(data: ICreatePartialUserDTO): Promise<PartialUser>;
}
