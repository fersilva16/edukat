import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

import { auth, hasOneOf } from '../middlewares';

const inviteRoutes = Router();

inviteRoutes.post('/', createRequestHandler('CreateInvite', auth, hasOneOf('MANAGE_INVITES', 'CREATE_INVITES')));

inviteRoutes.get('/', createRequestHandler('ShowAllInvites', auth, hasOneOf('MANAGE_INVITES', 'VIEW_INVITES')));

export default inviteRoutes;
