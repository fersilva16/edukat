import Session from '@users/entities/Session';

import ICreateSessionDTO from './dtos/ICreateSessionDTO';

export default interface ISessionRepository {
  allExpired(): Promise<Session[]>;

  findById(id: string): Promise<Session>;

  create(data: ICreateSessionDTO): Promise<Session>;

  update(id: string, data: Partial<ICreateSessionDTO>): Promise<void>;

  delete(id: string): Promise<void>;

  clear(): Promise<void>;
}
