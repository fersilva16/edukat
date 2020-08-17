import { Router } from 'express';
import { render, handle } from '.';

const routes = Router();

routes.get('/', render('Home'));

routes.get('*', (request, response) => handle(request, response));

export default routes;
