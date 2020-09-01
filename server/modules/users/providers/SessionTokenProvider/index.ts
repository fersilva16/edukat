import { container } from 'tsyringe';

import ISessionTokenProvider from './ISessionTokenProvider';
import OpaqueSessionTokenProvider from './implementations/OpaqueSessionTokenProvider';

container.registerSingleton<ISessionTokenProvider>('SessionTokenProvider', OpaqueSessionTokenProvider);
