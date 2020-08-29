import {
  RequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';

export type Controller = {
  handle(request: Request, response: Response): Promise<void>;
  handle(request: Request, response: Response, next: NextFunction): Promise<void>;
};

export default function createRequestHandler({ handle }: Controller): RequestHandler {
  return (request, response, next) => handle(request, response, next).catch(next);
}
