import { container } from 'tsyringe';

import ISessionCacheProvider from './ISessionCacheProvider';
import RedisSessionCacheProvider from './implementations/RedisSessionCacheProvider';

container.registerSingleton<ISessionCacheProvider>('SessionCacheProvider', RedisSessionCacheProvider);
