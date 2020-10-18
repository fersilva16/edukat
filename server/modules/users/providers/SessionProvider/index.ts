import { container } from 'tsyringe';

import OpaqueSessionProvider from './implementations/OpaqueSessionProvider';
import ISessionProvider from './ISessionProvider';

container.registerSingleton<ISessionProvider>('SessionProvider', OpaqueSessionProvider);
