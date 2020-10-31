import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';
import transform from '~/utils/transform';

import RefreshSessionUseCase from './RefreshSessionUseCase';

@injectable()
export default class RefreshSessionController implements IController {
  constructor(
    @inject('RefreshSessionUseCase')
    private refreshSessionUseCase: RefreshSessionUseCase,
  ) {}

  async handle({ data }: Request, response: Response): Promise<void> {
    const session = await this.refreshSessionUseCase.execute(data!);

    response.status(200).send(
      transform.toPlain(session),
    );
  }
}
