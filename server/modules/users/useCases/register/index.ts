import { container } from 'tsyringe';

import RegisterUseCase from '@users/useCases/register/RegisterUseCase';

container.registerSingleton('RegisterUseCase', RegisterUseCase);
