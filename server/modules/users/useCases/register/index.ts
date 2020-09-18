import { container } from 'tsyringe';

import RegisterController from './RegisterController';
import RegisterDTO from './RegisterDTO';
import RegisterUseCase from './RegisterUseCase';

container.registerSingleton('RegisterController', RegisterController);
container.register('RegisterDTO', { useValue: RegisterDTO });
container.registerSingleton('RegisterUseCase', RegisterUseCase);
