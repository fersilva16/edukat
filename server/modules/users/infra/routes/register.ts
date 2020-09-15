import { Router } from 'express';
import { container } from 'tsyringe';

import createRequestHandler from '~/utils/createRequestHandler';

import RegisterController from '@users/useCases/register/RegisterController';
import ShowRegisterDataController from '@users/useCases/showRegisterData/ShowRegisterDataController';

const showRegisterDataController = container.resolve(ShowRegisterDataController);
const registerController = container.resolve(RegisterController);

const registerRoutes = Router();

registerRoutes.post('/', createRequestHandler(registerController));

registerRoutes.get('/:token/data', createRequestHandler(showRegisterDataController));

export default registerRoutes;
