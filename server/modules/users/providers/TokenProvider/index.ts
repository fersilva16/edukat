import { container } from 'tsyringe';

import ITokenProvider from './ITokenProvider';
import JWTTokenProvider from './implementations/JWTTokenProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider);
