import { container } from 'tsyringe';

import CreateUserController from './CreateUserController';
import CreateUserUseCase from './CreateUserUseCase';

container.registerSingleton('CreateUserController', CreateUserController);
container.registerSingleton('CreateUserUseCase', CreateUserUseCase);
