import { container } from 'tsyringe';

import GetCurrentUserController from './GetCurrentUserController';
import GetCurrentUserUseCase from './GetCurrentUserUseCase';

container.registerSingleton('GetCurrentUserController', GetCurrentUserController);
container.registerSingleton('GetCurrentUserUseCase', GetCurrentUserUseCase);
