import { ValidationError } from 'class-validator';

import { Request, Response } from 'express';

import Exception from './Exception';

export default class ValidationException extends Exception {
  constructor(entity: string, readonly errors: ValidationError[]) {
    super(`Unprocessable ${entity}`, 422, `UNPROCESSABLE_${entity.toUpperCase()}`);
  }

  handle(request: Request, response: Response): void {
    response.status(this.status).json({
      error: {
        message: this.message,
        code: this.code,
        errors: this.errors,
      },
    });
  }
}
