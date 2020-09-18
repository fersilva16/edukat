import { Request, Response, NextFunction } from 'express';

export default interface IController {
  handle(request: Request, response: Response): Promise<void>;
  handle(request: Request, response: Response, next: NextFunction): Promise<void>;
}
