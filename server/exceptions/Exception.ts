import { Request, Response, NextFunction } from 'express';

export default class Expection extends Error {
  readonly name: string;

  readonly message: string;

  readonly status: number;

  readonly code: string;

  constructor(message: string, status: number = 500, code: string) {
    super(message);

    this.status = status;

    this.code = code;

    Error.captureStackTrace(this, this.constructor);
  }

  handle(request: Request, response: Response, next: NextFunction): void {
    response.status(this.status).json({
      error: {
        message: this.message,
        code: this.code,
      },
    });

    next();
  }
}
