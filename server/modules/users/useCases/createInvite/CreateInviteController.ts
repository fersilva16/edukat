import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';

import CreateInviteUseCase from './CreateInviteUseCase';

@injectable()
export default class CreateInviteController implements IController {
  constructor(
    @inject('CreateInviteUseCase')
    private createInviteUseCase: CreateInviteUseCase,
  ) {}

  async handle({ data, user, userType }: Request, response: Response): Promise<void> {
    await this.createInviteUseCase.execute({
      ...data,

      user: user!,
      userType: userType!,
    });

    response.status(201).send();
  }
}
