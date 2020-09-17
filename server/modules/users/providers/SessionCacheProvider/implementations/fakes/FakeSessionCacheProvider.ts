import Session from '@users/entities/Session';

import ISessionCacheProvider from '../../ISessionCacheProvider';

export default class FakeSessionCacheProvider implements ISessionCacheProvider {
  private sessions = new Map<string, Session>();

  async save(id: string, user: Session): Promise<void> {
    this.sessions.set(id, user);
  }

  async exists(id: string): Promise<boolean> {
    return this.sessions.has(id);
  }

  async recover(id: string): Promise<Session | undefined> {
    return this.sessions.get(id);
  }

  async invalidate(id: string): Promise<void> {
    this.sessions.delete(id);
  }

  async invalidateAll(): Promise<void> {
    const keys = this.sessions.keys();

    Array.from(keys).forEach((key) => this.sessions.delete(key));
  }
}
