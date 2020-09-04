import { container } from 'tsyringe';

import KnexSessionRepository from './implementations/KnexSessionRepository';
import ISessionRepository from './ISessionRepository';

container.registerSingleton<ISessionRepository>('SessionRepository', KnexSessionRepository);
