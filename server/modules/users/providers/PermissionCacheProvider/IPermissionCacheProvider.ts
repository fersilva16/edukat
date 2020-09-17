export default interface IPermissionCacheProvider {
  save(id: string, permissions: string): Promise<void>;

  exists(id: string): Promise<boolean>;

  recover(id: string): Promise<string | undefined>;

  invalidate(id: string): Promise<void>;

  invalidateAll(): Promise<void>;
}
