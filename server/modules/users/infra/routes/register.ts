import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

const registerRoutes = Router();

registerRoutes.post('/', createRequestHandler('Register'));

registerRoutes.get('/:token/data', createRequestHandler('ShowRegisterData'));

export default registerRoutes;
