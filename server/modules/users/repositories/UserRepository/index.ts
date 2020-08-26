import { container } from 'tsyringe';

import IUserRepository from './IUserRepository';
import KnexUserRepository from './implementations/KnexUserRepository';

container.registerSingleton<IUserRepository>('UserRepository', KnexUserRepository);
