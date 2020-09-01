import { Request, Response } from 'express';

import { KeyofFlags } from '@users/dtos/Flags';

import ForbiddenException from './ForbiddenException';

export default class MissingPermissionsException extends ForbiddenException {
  constructor(readonly permissions: KeyofFlags[]) {
    super('Missing permissions', 'MISSING_PERMISSIONS');
  }

  handle(request: Request, response: Response): void {
    response.status(this.status).json({
      error: {
        message: this.message,
        code: this.code,
        missing: this.permissions,
      },
    });
  }
}
