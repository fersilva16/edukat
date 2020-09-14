import { Router } from 'express';
import { container } from 'tsyringe';

import createRequestHandler from '~/utils/createRequestHandler';

import ShowRegisterDataController from '@users/useCases/showRegisterData/ShowRegisterDataController';

const showRegisterDataController = container.resolve(ShowRegisterDataController);

const registerRoutes = Router();

registerRoutes.get('/:token/data', createRequestHandler(showRegisterDataController));

export default registerRoutes;
