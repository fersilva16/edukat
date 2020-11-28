import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

import { auth, hasOneOf } from '../middlewares';

const typeUserRoutes = Router();

typeUserRoutes.get('/', createRequestHandler('ShowAllTypes', auth, hasOneOf('MANAGE_TYPES', 'VIEW_TYPES')));

typeUserRoutes.post('/:type_id/users', createRequestHandler(
  'CreateUser',
  auth,
  hasOneOf('MANAGE_USERS', 'CREATE_USERS'),
));

export default typeUserRoutes;
