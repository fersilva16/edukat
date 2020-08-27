import { container } from 'tsyringe';

import ISessionRepository from './ISessionRepository';
import KnexSessionRepository from './implementations/KnexSessionRepository';

container.registerSingleton<ISessionRepository>('SessionRepository', KnexSessionRepository);
