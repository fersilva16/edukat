import { Request, Response, NextFunction } from 'express';

type Middleware = (request: Request, response: Response, next: NextFunction) => Promise<void>;

export default function createMiddleware(middleware: Middleware) {
  return (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => middleware(request, response, next).catch(next);
}
