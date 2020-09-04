import { container } from 'tsyringe';

import JWTTokenProvider from './implementations/JWTTokenProvider';
import ITokenProvider from './ITokenProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', JWTTokenProvider);
