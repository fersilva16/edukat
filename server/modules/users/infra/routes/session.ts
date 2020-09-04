import { Router } from 'express';
import { container } from 'tsyringe';

import createRequestHandler from '~/utils/createRequestHandler';

import LoginController from '@users/useCases/login/LoginController';

const loginController = container.resolve(LoginController);

const routes = Router();

routes.post('/', createRequestHandler(loginController));

export default routes;
