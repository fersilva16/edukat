import User from '@users/entities/User';

export default interface IUserCacheProvider {
  save(id: string, user: User): Promise<void>;

  exists(id: string): Promise<boolean>;

  recover(id: string): Promise<User | undefined>;

  invalidate(id: string): Promise<void>;

  invalidateAll(): Promise<void>;
}
