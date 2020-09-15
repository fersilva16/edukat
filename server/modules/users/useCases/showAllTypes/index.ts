import { container } from 'tsyringe';

import ShowAllTypesController from './ShowAllTypesController';
import ShowAllTypesUseCase from './ShowAllTypesUseCase';

container.registerSingleton('ShowAllTypesController', ShowAllTypesController);
container.registerSingleton('ShowAllTypesUseCase', ShowAllTypesUseCase);
