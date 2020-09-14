import { Router } from 'express';
import { container } from 'tsyringe';

import createRequestHandler from '~/utils/createRequestHandler';

import VerifyEmailController from '@users/useCases/verifyEmail/VerifyEmailController';

const verifyEmailController = container.resolve(VerifyEmailController);

const emailRoutes = Router();

emailRoutes.post('/', createRequestHandler(verifyEmailController));

export default emailRoutes;
