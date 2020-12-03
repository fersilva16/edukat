import { container } from 'tsyringe';

import RememberUserController from './RememberUserController';
import RememberUserDTO from './RememberUserDTO';
import RememberUserUseCase from './RememberUserUseCase';

container.registerSingleton('RememberUserController', RememberUserController);
container.register('RememberUserDTO', { useValue: RememberUserDTO });
container.registerSingleton('RememberUserUseCase', RememberUserUseCase);
