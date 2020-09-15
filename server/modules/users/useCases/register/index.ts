import { container } from 'tsyringe';

import RegisterController from './RegisterController';
import RegisterUseCase from './RegisterUseCase';

container.registerSingleton('RegisterController', RegisterController);
container.registerSingleton('RegisterUseCase', RegisterUseCase);
