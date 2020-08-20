import { Router } from 'express';

const apiRoutes = Router();

apiRoutes.get('/', (request, response) => response.json({ hello: 'world' }));

export default apiRoutes;
