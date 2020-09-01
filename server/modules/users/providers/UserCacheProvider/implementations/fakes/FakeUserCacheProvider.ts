import User from '@users/entities/User';

import IUserCacheProvider from '../../IUserCacheProvider';

export default class FakeUserCacheProvider implements IUserCacheProvider {
  private users = new Map<string, User>();

  async save(id: string, user: User): Promise<void> {
    this.users.set(id, user);
  }

  async recover(id: string): Promise<User> {
    return this.users.get(id);
  }

  async invalidate(id: string): Promise<void> {
    this.users.delete(id);
  }

  async invalidateAll(): Promise<void> {
    const keys = this.users.keys();

    Array.from(keys).forEach((key) => this.users.delete(key));
  }
}
