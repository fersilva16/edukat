import { container } from 'tsyringe';

import ResetPasswordController from './ResetPasswordController';
import ResetPasswordDTO from './ResetPasswordDTO';
import ResetPasswordUseCase from './ResetPasswordUseCase';

container.registerSingleton('ResetPasswordController', ResetPasswordController);
container.register('ResetPasswordDTO', { useValue: ResetPasswordDTO });
container.registerSingleton('ResetPasswordUseCase', ResetPasswordUseCase);
