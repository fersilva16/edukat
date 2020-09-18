import { container } from 'tsyringe';

import KnexPartialUserRepository from './implementations/KnexPartialUserRepository';
import IPartialUserRepository from './IPartialUserRepository';

container.registerSingleton<IPartialUserRepository>(
  'PartialUserRepository',
  KnexPartialUserRepository,
);
