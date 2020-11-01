import { container } from 'tsyringe';

import ForgotPasswordController from './ForgotPasswordController';
import ForgotPasswordDTO from './ForgotPasswordDTO';
import ForgotPasswordUseCase from './ForgotPasswordUseCase';

container.registerSingleton('ForgotPasswordController', ForgotPasswordController);
container.register('ForgotPasswordDTO', { useValue: ForgotPasswordDTO });
container.registerSingleton('ForgotPasswordUseCase', ForgotPasswordUseCase);
