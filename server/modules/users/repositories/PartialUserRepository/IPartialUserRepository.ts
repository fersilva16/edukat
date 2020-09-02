import PartialUser from '@users/entities/PartialUser';
import ICreatePartialUserDTO from '@users/dtos/ICreatePartialUserDTO';

export default interface IPartialUserRepository {
  findById(id: string): Promise<PartialUser>;

  findByEmail(email: string): Promise<PartialUser>;

  create(data: ICreatePartialUserDTO): Promise<PartialUser>;
}
