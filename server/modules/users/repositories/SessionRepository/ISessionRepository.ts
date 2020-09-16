import Session from '@users/entities/Session';

import ICreateSessionDTO from './dtos/ICreateSessionDTO';

export default interface ISessionRepository {
  findById(id: string): Promise<Session>;

  create(data: ICreateSessionDTO): Promise<Session>;
}
