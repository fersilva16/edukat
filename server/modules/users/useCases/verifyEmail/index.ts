import { container } from 'tsyringe';

import VerifyEmailUseCase from './VerifyEmailUseCase';

container.registerSingleton('VerifyEmailUseCase', VerifyEmailUseCase);
