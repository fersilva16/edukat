import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import type { IController } from '~/types';
import transform from '~/utils/transform';

import ShowAllTypesUseCase from './ShowAllTypesUseCase';

@injectable()
export default class ShowAllTypesController implements IController {
  constructor(
    @inject('ShowAllTypesUseCase')
    private showAllTypesUseCase: ShowAllTypesUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const types = await this.showAllTypesUseCase.execute();

    response.status(200).json(
      transform.toPlain(types),
    );
  }
}
