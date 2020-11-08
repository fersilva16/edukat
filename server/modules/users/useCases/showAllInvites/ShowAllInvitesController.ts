import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';
import transform from '~/utils/transform';

import ShowAllInvitesUseCase from './ShowAllInvitesUseCase';

@injectable()
export default class ShowAllInvitesController implements IController {
  constructor(
    @inject('ShowAllInvitesUseCase')
    private showAllInvitesUseCase: ShowAllInvitesUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    const invites = await this.showAllInvitesUseCase.execute();

    response.status(200).send(
      transform.toPlain(invites),
    );
  }
}
