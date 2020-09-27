import Session from '@users/entities/Session';

import ICreateSessionDTO from './dtos/ICreateSessionDTO';

export default interface ISessionRepository {
  allExpired(): Promise<Session[]>;

  findById(id: string): Promise<Session>;

  create(data: ICreateSessionDTO): Promise<Session>;
}
