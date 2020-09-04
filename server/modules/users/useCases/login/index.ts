import { container } from 'tsyringe';

import LoginUseCase from './LoginUseCase';

container.registerSingleton('LoginUseCase', LoginUseCase);
