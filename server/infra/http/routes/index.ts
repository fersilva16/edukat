import { Router } from 'express';

import apiRoutes from './api';
import clientRoutes from './client';

const routes = Router();

routes.use('/api', apiRoutes);

routes.use('/', clientRoutes);

export default routes;
