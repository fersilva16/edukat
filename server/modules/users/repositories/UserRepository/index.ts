import { container } from 'tsyringe';

import KnexUserRepository from './implementations/KnexUserRepository';
import IUserRepository from './IUserRepository';

container.registerSingleton<IUserRepository>('UserRepository', KnexUserRepository);
