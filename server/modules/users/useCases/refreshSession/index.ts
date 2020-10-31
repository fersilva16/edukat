import { container } from 'tsyringe';

import RefreshSessionController from './RefreshSessionController';
import RefreshSessionDTO from './RefreshSessionDTO';
import RefreshSessionUseCase from './RefreshSessionUseCase';

container.registerSingleton('RefreshSessionController', RefreshSessionController);
container.register('RefreshSessionDTO', { useValue: RefreshSessionDTO });
container.registerSingleton('RefreshSessionUseCase', RefreshSessionUseCase);
