import { container } from 'tsyringe';

import RedisPermissionCacheProvider from './implementations/RedisPermissionCacheProvider';
import IPermissionCacheProvider from './IPermissionCacheProvider';

container.registerSingleton<IPermissionCacheProvider>(
  'PermissionCacheProvider',
  RedisPermissionCacheProvider,
);
