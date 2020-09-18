import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';

import RegisterUseCase from './RegisterUseCase';

@injectable()
export default class RegisterController implements IController {
  constructor(
    @inject('RegisterUseCase')
    private registerUseCase: RegisterUseCase,
  ) {}

  async handle({ data }: Request, response: Response): Promise<void> {
    await this.registerUseCase.execute(data!);

    response.status(201).send();
  }
}
