import { classToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';

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
      classToPlain(types),
    );
  }
}
