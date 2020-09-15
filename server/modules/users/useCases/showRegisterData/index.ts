import { container } from 'tsyringe';

import ShowRegisterDataController from './ShowRegisterDataController';
import ShowRegisterDataUseCase from './ShowRegisterDataUseCase';

container.registerSingleton('ShowRegisterDataController', ShowRegisterDataController);
container.registerSingleton('ShowRegisterDataUseCase', ShowRegisterDataUseCase);
