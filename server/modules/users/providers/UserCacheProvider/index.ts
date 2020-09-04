import { container } from 'tsyringe';

import RedisUserCacheProvider from './implementations/RedisUserCacheProvider';
import IUserCacheProvider from './IUserCacheProvider';

container.registerSingleton<IUserCacheProvider>('UserCacheProvider', RedisUserCacheProvider);
