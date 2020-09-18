import { container } from 'tsyringe';

import CreateUserController from './CreateUserController';
import CreateUserDTO from './CreateUserDTO';
import CreateUserUseCase from './CreateUserUseCase';

container.registerSingleton('CreateUserController', CreateUserController);
container.register('CreateUserDTO', { useValue: CreateUserDTO });
container.registerSingleton('CreateUserUseCase', CreateUserUseCase);
