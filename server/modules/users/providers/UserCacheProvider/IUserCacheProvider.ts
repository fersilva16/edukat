import User from '@users/entities/User';

export default interface IUserCacheProvider {
  save(id: string, user: User): Promise<void>;

  recover(id: string): Promise<User>;

  invalidate(id: string): Promise<void>;

  invalidateAll(): Promise<void>;
}
