import { container } from 'tsyringe';

import CreateInviteController from './CreateInviteController';
import CreateInviteDTO from './CreateInviteDTO';
import CreateInviteUseCase from './CreateInviteUseCase';

container.registerSingleton('CreateInviteController', CreateInviteController);
container.register('CreateInviteDTO', { useValue: CreateInviteDTO });
container.registerSingleton('CreateInviteUseCase', CreateInviteUseCase);
