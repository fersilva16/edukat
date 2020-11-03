import { container } from 'tsyringe';

import IInviteRepository from './IInviteRepository';
import KnexInviteRepository from './implementations/KnexInviteRepository';

container.registerSingleton<IInviteRepository>(
  'InviteRepository',
  KnexInviteRepository,
);
