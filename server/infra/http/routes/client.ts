import { Router } from 'express';

import { render, handle } from '../ssr';

const clientRoutes = Router();

clientRoutes.get('/', render('Home'));

clientRoutes.get('*', (request, response) => handle(request, response));

export default clientRoutes;
