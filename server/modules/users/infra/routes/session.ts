import { container } from 'tsyringe';
import { Router } from 'express';

import CreateSessionController from '@users/useCases/createSession/CreateSessionController';

import createRequestHandler from '~/utils/createRequestHandler';

const createSessionController = container.resolve(CreateSessionController);

const routes = Router();

routes.post('/', createRequestHandler(createSessionController));

export default routes;
