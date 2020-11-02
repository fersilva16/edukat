import Session from '@users/entities/Session';

export default interface ISessionCacheProvider {
  save(session: Session): Promise<void>;

  exists(id: string): Promise<boolean>;

  recover(id: string): Promise<Session | undefined>;

  invalidate(id: string): Promise<void>;

  invalidateAll(): Promise<void>;
}
