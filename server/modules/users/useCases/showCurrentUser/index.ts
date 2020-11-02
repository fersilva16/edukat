import { container } from 'tsyringe';

import ShowCurrentUserController from './ShowCurrentUserController';
import ShowCurrentUserUseCase from './ShowCurrentUserUseCase';

container.registerSingleton('ShowCurrentUserController', ShowCurrentUserController);
container.registerSingleton('ShowCurrentUserUseCase', ShowCurrentUserUseCase);
