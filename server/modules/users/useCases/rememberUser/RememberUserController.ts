import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';

import RememberUserUseCase from './RememberUserUseCase';

@injectable()
export default class RememberUserController implements IController {
  constructor(
    @inject('RememberUserUseCase')
    private rememberUserUseCase: RememberUserUseCase,
  ) {}

  async handle({ data }: Request, response: Response): Promise<void> {
    const result = await this.rememberUserUseCase.execute(data!);

    response.status(200).send(result);
  }
}
