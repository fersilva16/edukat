import { container } from 'tsyringe';

import RedisSessionCacheProvider from './implementations/RedisSessionCacheProvider';
import ISessionCacheProvider from './ISessionCacheProvider';

container.registerSingleton<ISessionCacheProvider>('SessionCacheProvider', RedisSessionCacheProvider);
