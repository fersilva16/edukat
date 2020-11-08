import { container } from 'tsyringe';

import ShowAllInvitesController from './ShowAllInvitesController';
import ShowAllInvitesUseCase from './ShowAllInvitesUseCase';

container.registerSingleton('ShowAllInvitesController', ShowAllInvitesController);
container.registerSingleton('ShowAllInvitesUseCase', ShowAllInvitesUseCase);
