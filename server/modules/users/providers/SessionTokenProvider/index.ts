import { container } from 'tsyringe';

import OpaqueSessionTokenProvider from './implementations/OpaqueSessionTokenProvider';
import ISessionTokenProvider from './ISessionTokenProvider';

container.registerSingleton<ISessionTokenProvider>(
  'SessionTokenProvider',
  OpaqueSessionTokenProvider,
);
