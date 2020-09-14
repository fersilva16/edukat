import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';
import validateParams from '~/utils/validate/params';

import ShowRegisterDataParams from '@users/infra/validators/ShowRegisterDataParams';

import ShowRegisterDataUseCase from './ShowRegisterDataUseCase';

@injectable()
export default class ShowRegisterDataController implements IController {
  constructor(
    @inject('ShowRegisterDataUseCase')
    private showRegisterDataUseCase: ShowRegisterDataUseCase,
  ) {}

  async handle({ params }: Request, response: Response): Promise<void> {
    const data = await this.showRegisterDataUseCase.execute({ token: params.token });

    response.status(200).json(data);
  }

  async validate(request: Request): Promise<void> {
    await validateParams(ShowRegisterDataParams, request.params);
  }
}
