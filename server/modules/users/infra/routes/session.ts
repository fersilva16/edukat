import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

const sessionRoutes = Router();

sessionRoutes.post('/', createRequestHandler('Login'));

sessionRoutes.post('/refresh', createRequestHandler('RefreshSession'));

export default sessionRoutes;
