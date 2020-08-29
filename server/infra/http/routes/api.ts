import {
  Router,
  Request,
  Response,
  NextFunction,
} from 'express';

import sessionRoutes from '@users/infra/routes/session';

import Exception from '~/exceptions/Exception';
import Handler from '~/exceptions/Handler';

const handler = new Handler();

const apiRoutes = Router();

apiRoutes.use('/sessions', sessionRoutes);

apiRoutes.use((
  error: Exception | Error,
  request: Request,
  response: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => handler.handle(error, request, response));

export default apiRoutes;
