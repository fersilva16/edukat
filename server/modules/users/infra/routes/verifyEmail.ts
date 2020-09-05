import { Router } from 'express';
import { container } from 'tsyringe';

import createRequestHandler from '~/utils/createRequestHandler';

import VerifyEmailController from '@users/useCases/verifyEmail/VerifyEmailController';

const verifyEmailController = container.resolve(VerifyEmailController);

const verifyEmailRoutes = Router();

verifyEmailRoutes.post('/', createRequestHandler(verifyEmailController));

export default verifyEmailRoutes;
