import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';

import CreateUserUseCase from './CreateUserUseCase';

@injectable()
export default class CreateUserController implements IController {
  constructor(
    @inject('CreateUserUseCase')
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle({ data }: Request, response: Response): Promise<void> {
    await this.createUserUseCase.execute(data!);

    response.status(201).send();
  }
}
