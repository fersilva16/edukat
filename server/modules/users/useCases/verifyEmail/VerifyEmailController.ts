import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import type { IController } from '~/types';

import VerifyEmailUseCase from './VerifyEmailUseCase';

@injectable()
export default class VerifyEmailController implements IController {
  constructor(
    @inject('VerifyEmailUseCase')
    private verifyEmailUseCase: VerifyEmailUseCase,
  ) {}

  async handle({ data }: Request, response: Response): Promise<void> {
    await this.verifyEmailUseCase.execute(data!);

    response.status(200).send();
  }
}
