import { Router } from 'express';

import { logging } from '../middlewares';
import { render, handle } from '../ssr';

const clientRoutes = Router();

clientRoutes.use(logging('ssr'));

clientRoutes.get('/', render('Home'));

clientRoutes.get('*', (request, response) => handle(request, response));

export default clientRoutes;
