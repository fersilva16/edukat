import { container } from 'tsyringe';

import IHashProvider from './IHashProvider';
import ArgonHashProvider from './implementations/ArgonHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', ArgonHashProvider);
