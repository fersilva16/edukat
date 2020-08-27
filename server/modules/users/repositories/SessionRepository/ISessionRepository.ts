import ICreateSessionDTO from '@users/dtos/ICreateSessionDTO';
import Session from '@users/entities/Session';

export default interface ISessionRepository {
  findById(id: string): Promise<Session>;

  create(data: ICreateSessionDTO): Promise<Session>;
}
