import { container } from 'tsyringe';

import VerifyEmailController from './VerifyEmailController';
import VerifyEmailDTO from './VerifyEmailDTO';
import VerifyEmailUseCase from './VerifyEmailUseCase';

container.registerSingleton('VerifyEmailController', VerifyEmailController);
container.register('VerifyEmailDTO', { useValue: VerifyEmailDTO });
container.registerSingleton('VerifyEmailUseCase', VerifyEmailUseCase);
