import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';

import LoginUseCase from './LoginUseCase';

@injectable()
export default class LoginController implements IController {
  constructor(
    @inject('LoginUseCase')
    private loginUseCase: LoginUseCase,
  ) {}

  async handle({ data }: Request, response: Response): Promise<void> {
    const token = await this.loginUseCase.execute(data!);

    response.send(classToPlain(token));
  }
}
