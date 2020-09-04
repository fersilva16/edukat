import { Router } from 'express';
import { container } from 'tsyringe';

import createRequestHandler from '~/utils/createRequestHandler';

import CreateSessionController from '@users/useCases/createSession/CreateSessionController';

const createSessionController = container.resolve(CreateSessionController);

const routes = Router();

routes.post('/', createRequestHandler(createSessionController));

export default routes;
