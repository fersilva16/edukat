import { Router } from 'express';
import { container } from 'tsyringe';

import createRequestHandler from '~/utils/createRequestHandler';

import CreateUserController from '@users/useCases/createUser/CreateUserController';

import auth from '../middlewares/auth';
import has from '../middlewares/has';

const createUserController = container.resolve(CreateUserController);

const typeUserRoutes = Router();

typeUserRoutes.post('/:type_id/users', auth, has('MANAGE_USERS'), createRequestHandler(createUserController));

export default typeUserRoutes;
