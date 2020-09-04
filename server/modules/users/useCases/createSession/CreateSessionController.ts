import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import validateObject from '~/utils/validate/object';

import Crendetials from '@users/infra/validators/Credentials';

import CreateSessionUseCase from './CreateSessionUseCase';

@injectable()
export default class CreateSessionController {
  constructor(
    @inject('CreateSessionUseCase')
    private createSessionUseCase: CreateSessionUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const token = await this.createSessionUseCase.execute(request.body);

    response.send(token);
  }

  async validate(request: Request): Promise<void> {
    await validateObject(Crendetials, request.body);
  }
}
