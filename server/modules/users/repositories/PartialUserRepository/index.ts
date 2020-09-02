import { container } from 'tsyringe';

import IPartialUserRepository from './IPartialUserRepository';
import KnexPartialUserRepository from './implementations/KnexPartialUserRepository';

container.registerSingleton<IPartialUserRepository>('PartialUserRepository', KnexPartialUserRepository);
