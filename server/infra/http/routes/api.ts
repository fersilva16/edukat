import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

import Exception from '~/exceptions/Exception';
import Handler from '~/exceptions/Handler';

import sessionRoutes from '@users/infra/routes/session';
import typeRoutes from '@users/infra/routes/type';

const handler = new Handler();

const apiRoutes = Router();

apiRoutes.use('/sessions', sessionRoutes);

apiRoutes.use('/types', typeRoutes);

apiRoutes.use((
  error: Exception | Error,
  request: Request,
  response: Response,
  next: NextFunction,
) => handler.handle(error, request, response, next));

export default apiRoutes;
