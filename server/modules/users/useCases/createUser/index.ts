import { container } from 'tsyringe';

import CreateUserUseCase from './CreateUserUseCase';

container.registerSingleton('CreateUserUseCase', CreateUserUseCase);
