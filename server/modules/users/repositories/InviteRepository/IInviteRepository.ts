import Invite from '@users/entities/Invite';

import ICreateInviteDTO from './dtos/ICreateInviteDTO';

export default interface IInviteRepository {
  all(): Promise<Invite[]>;

  findById(id: string): Promise<Invite>;

  create(data: ICreateInviteDTO): Promise<Invite>;

  update(id: string, data: Partial<ICreateInviteDTO>): Promise<void>;

  clear(): Promise<void>;
}
