import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

const routes = Router();

routes.post('/', createRequestHandler('Login'));

export default routes;
