import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

import { auth, has } from '../middlewares';

const typeUserRoutes = Router();

typeUserRoutes.get('/', createRequestHandler('ShowAllTypes', auth, has('MANAGE_TYPES')));

typeUserRoutes.post('/:type_id/users', createRequestHandler('CreateUser', auth, has('MANAGE_USERS')));

export default typeUserRoutes;
