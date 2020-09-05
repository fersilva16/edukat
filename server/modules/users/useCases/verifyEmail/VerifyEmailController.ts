import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';
import validateObject from '~/utils/validate/object';

import Email from '@users/infra/validators/Email';

import VerifyEmailUseCase from './VerifyEmailUseCase';

@injectable()
export default class VerifyEmailController implements IController {
  constructor(
    @inject('VerfiyEmailUseCase')
    private verifyEmailUseCase: VerifyEmailUseCase,
  ) {}

  async handle({ body }: Request, response: Response): Promise<void> {
    await this.verifyEmailUseCase.execute(body);

    response.status(200).send();
  }

  async validate(request: Request): Promise<void> {
    await validateObject(Email, request.body);
  }
}
