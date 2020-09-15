import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import RegisterData from '~/modules/users/infra/validators/RegisterData';
import IController from '~/types/IController';
import validateObject from '~/utils/validate/object';

import RegisterUseCase from './RegisterUseCase';

@injectable()
export default class RegisterController implements IController {
  constructor(
    @inject('RegisterUseCase')
    private registerUseCase: RegisterUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    await this.registerUseCase.execute(request.body);

    response.status(201).send();
  }

  async validate(request: Request): Promise<void> {
    await validateObject(RegisterData, request.body);
  }
}
