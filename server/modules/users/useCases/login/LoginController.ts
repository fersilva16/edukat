import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import validateObject from '~/utils/validate/object';

import Crendetials from '@users/infra/validators/Credentials';

import LoginUseCase from './LoginUseCase';

@injectable()
export default class LoginController {
  constructor(
    @inject('LoginUseCase')
    private loginUseCase: LoginUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const token = await this.loginUseCase.execute(request.body);

    response.send(token);
  }

  async validate(request: Request): Promise<void> {
    await validateObject(Crendetials, request.body);
  }
}
