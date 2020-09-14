import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

import toUpperCase from '~/utils/toUpperCase';

import Exception from './Exception';

export default class ValidationException extends Exception {
  constructor(entity: string, readonly errors: ValidationError[]) {
    super(`Unprocessable ${entity}`, 422, `UNPROCESSABLE_${toUpperCase(entity)}`);
  }

  handle(request: Request, response: Response, next: NextFunction): void {
    response.status(this.status).json({
      error: {
        message: this.message,
        code: this.code,
        errors: this.errors,
      },
    });

    next();
  }
}
