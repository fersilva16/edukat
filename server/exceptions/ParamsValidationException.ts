import { ValidationError } from 'class-validator';
import { Response, Request, NextFunction } from 'express';

import BadRequestException from './BadRequestException';

export default class ParamsValidationException extends BadRequestException {
  constructor(readonly errors: ValidationError) {
    super('Invalid params', 'INVALID_PARAMS');
  }

  handle(request: Request, response: Response, next: NextFunction): void {
    response.status(this.status).send({
      error: {
        message: this.message,
        code: this.code,
        errors: this.errors,
      },
    });

    next();
  }
}
