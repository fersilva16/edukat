import { container } from 'tsyringe';

import ITokenProvider from './ITokenProvider';
import OpaqueTokenProvider from './implementations/OpaqueTokenProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', OpaqueTokenProvider);
