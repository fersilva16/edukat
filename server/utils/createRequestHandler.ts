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

export default function createRequestHandler(controller: Controller): RequestHandler {
  return (request, response, next) => controller.handle(request, response, next).catch(next);
}
