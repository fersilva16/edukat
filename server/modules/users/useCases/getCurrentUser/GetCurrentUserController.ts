import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';
import transform from '~/utils/transform';

import GetCurrentUserUseCase from './GetCurrentUserUseCase';

@injectable()
export default class GetCurrentUserController implements IController {
  constructor(
    @inject('GetCurrentUserUseCase')
    private getCurrentUserUseCase: GetCurrentUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const user = await this.getCurrentUserUseCase.execute({ id: request.user!.id });

    response.status(200).send(
      transform.toPlain(user),
    );
  }
}
