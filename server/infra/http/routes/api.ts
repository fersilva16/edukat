import { Router } from 'express';

import Handler from '~/exceptions/Handler';

const handler = new Handler();

const apiRoutes = Router();

apiRoutes.use(handler.handle);

export default apiRoutes;
