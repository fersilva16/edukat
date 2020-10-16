import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import type { IController } from '~/types';

import ShowRegisterDataUseCase from './ShowRegisterDataUseCase';

@injectable()
export default class ShowRegisterDataController implements IController {
  constructor(
    @inject('ShowRegisterDataUseCase')
    private showRegisterDataUseCase: ShowRegisterDataUseCase,
  ) {}

  async handle({ data }: Request, response: Response): Promise<void> {
    const registerData = await this.showRegisterDataUseCase.execute(data!);

    response.status(200).json(registerData);
  }
}
