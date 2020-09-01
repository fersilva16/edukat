import IPermissionCacheProvider from '../../IPermissionCacheProvider';

export default class FakePermissionCacheProvider implements IPermissionCacheProvider {
  private permissions = new Map<string, string>();

  async save(id: string, permissions: string): Promise<void> {
    this.permissions.set(id, permissions);
  }

  async recover(id: string): Promise<string> {
    return this.permissions.get(id);
  }

  async invalidate(id: string): Promise<void> {
    this.permissions.delete(id);
  }

  async invalidateAll(): Promise<void> {
    const keys = this.permissions.keys();

    Array.from(keys).forEach((key) => this.permissions.delete(key));
  }
}
