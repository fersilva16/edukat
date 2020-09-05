import { container } from 'tsyringe';

import ShowAllTypesUseCase from './ShowAllTypesUseCase';

container.registerSingleton('ShowAllTypesUseCase', ShowAllTypesUseCase);
