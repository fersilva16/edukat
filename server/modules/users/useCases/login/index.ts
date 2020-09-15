import { container } from 'tsyringe';

import LoginController from './LoginController';
import LoginUseCase from './LoginUseCase';

container.registerSingleton('LoginController', LoginController);
container.registerSingleton('LoginUseCase', LoginUseCase);
