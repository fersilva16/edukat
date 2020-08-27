import { container } from 'tsyringe';

import IHashProvider from './IHashProvider';
import ArgonHashProvider from './implementations/ArgonHashProvider';
import SHA256HashProvider from './implementations/SHA256HashProvider';

container.registerSingleton<IHashProvider>('HashProvider', ArgonHashProvider);

container.registerSingleton<IHashProvider>('SHA256HashProvider', SHA256HashProvider);
