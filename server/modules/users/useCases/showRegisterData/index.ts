import { container } from 'tsyringe';

import ShowRegisterDataUseCase from './ShowRegisterDataUseCase';

container.registerSingleton('ShowRegisterDataUseCase', ShowRegisterDataUseCase);
