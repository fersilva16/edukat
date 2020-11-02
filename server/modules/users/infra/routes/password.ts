import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

const passwordRoutes = Router();

passwordRoutes.post('/forgot', createRequestHandler('ForgotPassword'));

passwordRoutes.post('/reset', createRequestHandler('ResetPassword'));

export default passwordRoutes;
