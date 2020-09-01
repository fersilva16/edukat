import { container } from 'tsyringe';

import IUserCacheProvider from './IUserCacheProvider';
import RedisUserCacheProvider from './implementations/RedisUserCacheProvider';

container.registerSingleton<IUserCacheProvider>('UserCacheProvider', RedisUserCacheProvider);
