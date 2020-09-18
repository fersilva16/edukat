import { ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

import BadRequestException from './BadRequestException';

export default class ValidationException extends BadRequestException {
  constructor(readonly errors: ValidationError[]) {
    super('Invalid request', 'INVALID_REQUEST');
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
