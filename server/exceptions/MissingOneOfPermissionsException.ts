import { Request, Response, NextFunction } from 'express';

import { KeyofFlags } from '@users/dtos/Flags';

import ForbiddenException from './ForbiddenException';

export default class MissingOneOfPermissionsException extends ForbiddenException {
  constructor(readonly permissions: KeyofFlags[]) {
    super('Missing one of permissions', 'MISSING_ONE_OF_PERMISSIONS');
  }

  handle(request: Request, response: Response, next: NextFunction): void {
    response.status(this.status).json({
      error: {
        message: this.message,
        code: this.code,
        missing: this.permissions,
      },
    });

    next();
  }
}
