import { container } from 'tsyringe';

import IPermissionCacheProvider from './IPermissionCacheProvider';
import RedisPermissionCacheProvider from './implementations/RedisPermissionCacheProvider';

container.registerSingleton<IPermissionCacheProvider>('PermissionCacheProvider', RedisPermissionCacheProvider);
