import { Router } from 'express';

import { render, handle } from '../ssr';
import apiRoutes from './api';

const routes = Router();

routes.use('/api', apiRoutes);

routes.get('/', render('Home'));

routes.get('*', (request, response) => handle(request, response));

export default routes;
