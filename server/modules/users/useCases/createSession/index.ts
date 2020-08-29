import { container } from 'tsyringe';

import CreateSessionUseCase from './CreateSessionUseCase';

container.registerSingleton('CreateSessionUseCase', CreateSessionUseCase);
