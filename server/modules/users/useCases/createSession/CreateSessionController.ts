import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import Crendetials from '@users/infra/validators/Credentials';

import { validateObject } from '~/utils/validate';

import CreateSessionUseCase from './CreateSessionUseCase';

@injectable()
export default class CreateSessionController {
  constructor(
    @inject('CreateSessionUseCase')
    private createSessionUseCase: CreateSessionUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const credentials = await validateObject(Crendetials, request.body);

    const token = await this.createSessionUseCase.execute(credentials);

    response.send(token);
  }
}
