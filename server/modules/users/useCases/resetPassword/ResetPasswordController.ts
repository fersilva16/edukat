import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';

import ResetPasswordUseCase from './ResetPasswordUseCase';

@injectable()
export default class ResetPasswordController implements IController {
  constructor(
    @inject('ResetPasswordUseCase')
    private resetPasswordUseCase: ResetPasswordUseCase,
  ) {}

  async handle({ data }: Request, response: Response): Promise<void> {
    await this.resetPasswordUseCase.execute(data!);

    response.status(200).send();
  }
}
