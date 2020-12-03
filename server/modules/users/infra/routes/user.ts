import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

import { auth } from '../middlewares';

const userRoutes = Router();

userRoutes.get('/me', createRequestHandler('ShowCurrentUser', auth));

userRoutes.post('/remember', createRequestHandler('RememberUser'));

export default userRoutes;
