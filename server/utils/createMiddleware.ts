import { Request, Response, NextFunction } from 'express';

import { IMiddleware } from '~/types';

export default function createMiddleware(middleware: IMiddleware, ...args: any[]) {
  return (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => middleware.handle(request, response, next, ...args).catch(next);
}
