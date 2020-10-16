import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import type { IController } from '~/types';
import transform from '~/utils/transform';

import LoginUseCase from './LoginUseCase';

@injectable()
export default class LoginController implements IController {
  constructor(
    @inject('LoginUseCase')
    private loginUseCase: LoginUseCase,
  ) {}

  async handle({ data }: Request, response: Response): Promise<void> {
    const token = await this.loginUseCase.execute(data!);

    response.send(transform.toPlain(token));
  }
}
