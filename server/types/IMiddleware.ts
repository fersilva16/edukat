import { Request, Response, NextFunction } from 'express';

export default interface IMiddleware {
  handle(request: Request, response: Response, next: NextFunction, ...args: any[]): Promise<void>;
}
