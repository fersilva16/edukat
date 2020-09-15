import { container } from 'tsyringe';

import VerifyEmailController from './VerifyEmailController';
import VerifyEmailUseCase from './VerifyEmailUseCase';

container.registerSingleton('VerifyEmailController', VerifyEmailController);
container.registerSingleton('VerifyEmailUseCase', VerifyEmailUseCase);
