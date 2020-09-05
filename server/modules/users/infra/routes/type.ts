import { Router } from 'express';
import { container } from 'tsyringe';

import createRequestHandler from '~/utils/createRequestHandler';

import CreateUserController from '@users/useCases/createUser/CreateUserController';
import ShowAllTypesController from '@users/useCases/showAllTypes/ShowAllTypesController';

import auth from '../middlewares/auth';
import has from '../middlewares/has';

const showAllTypesController = container.resolve(ShowAllTypesController);
const createUserController = container.resolve(CreateUserController);

const typeUserRoutes = Router();

typeUserRoutes.get('/', createRequestHandler(
  showAllTypesController,
  auth,
  has('MANAGE_TYPES'),
));

typeUserRoutes.post('/:type_id/users', createRequestHandler(
  createUserController,
  auth,
  has('MANAGE_USERS'),
));

export default typeUserRoutes;
