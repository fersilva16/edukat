import Session from '@users/entities/Session';

export default interface ISessionCacheProvider {
  save(id: string, user: Session): Promise<void>;

  exists(id: string): Promise<boolean>;

  recover(id: string): Promise<Session>;

  invalidate(id: string): Promise<void>;

  invalidateAll(): Promise<void>;
}
