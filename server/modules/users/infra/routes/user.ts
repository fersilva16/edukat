import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

import { auth } from '../middlewares';

const userRoutes = Router();

userRoutes.get('/me', createRequestHandler('GetCurrentUser', auth));

export default userRoutes;
