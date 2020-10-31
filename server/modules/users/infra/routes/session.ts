import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

const routes = Router();

routes.post('/', createRequestHandler('Login'));

routes.post('/refresh', createRequestHandler('RefreshSession'));

export default routes;
