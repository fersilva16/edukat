import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', createRequestHandler('ForgotPassword'));

export default passwordRoutes;
