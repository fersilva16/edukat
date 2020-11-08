import { Router } from 'express';

import createRequestHandler from '~/utils/createRequestHandler';

import { auth, has } from '../middlewares';

const inviteRoutes = Router();

inviteRoutes.post('/', createRequestHandler('CreateInvite', auth, has('MANAGE_INVITES')));

inviteRoutes.get('/', createRequestHandler('ShowAllInvites', auth, has('MANAGE_INVITES')));

export default inviteRoutes;
