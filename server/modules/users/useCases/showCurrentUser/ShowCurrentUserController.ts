import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';
import transform from '~/utils/transform';

import ShowCurrentUserUseCase from './ShowCurrentUserUseCase';

@injectable()
export default class ShowCurrentUserController implements IController {
  constructor(
    @inject('ShowCurrentUserUseCase')
    private showCurrentUserUseCase: ShowCurrentUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const user = await this.showCurrentUserUseCase.execute({ id: request.user!.id });

    response.status(200).send(
      transform.toPlain(user),
    );
  }
}
