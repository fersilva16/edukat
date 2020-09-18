import { container } from 'tsyringe';

import LoginController from './LoginController';
import LoginDTO from './LoginDTO';
import LoginUseCase from './LoginUseCase';

container.registerSingleton('LoginController', LoginController);
container.register('LoginDTO', { useValue: LoginDTO });
container.registerSingleton('LoginUseCase', LoginUseCase);
