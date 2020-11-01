import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';

import ForgotPasswordUseCase from './ForgotPasswordUseCase';

@injectable()
export default class ForgotPasswordController implements IController {
  constructor(
    @inject('ForgotPasswordUseCase')
    private forgotPasswordUseCase: ForgotPasswordUseCase,
  ) {}

  async handle({ data }: Request, response: Response): Promise<void> {
    await this.forgotPasswordUseCase.execute(data!);

    response.status(200).send();
  }
}
