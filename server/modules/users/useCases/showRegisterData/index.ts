import { container } from 'tsyringe';

import ShowRegisterDataController from './ShowRegisterDataController';
import ShowRegisterDataDTO from './ShowRegisterDataDTO';
import ShowRegisterDataUseCase from './ShowRegisterDataUseCase';

container.registerSingleton('ShowRegisterDataController', ShowRegisterDataController);
container.register('ShowRegisterDataDTO', { useValue: ShowRegisterDataDTO });
container.registerSingleton('ShowRegisterDataUseCase', ShowRegisterDataUseCase);
