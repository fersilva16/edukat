import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import IController from '~/types/IController';
import validateObject from '~/utils/validate/object';
import validateParams from '~/utils/validate/params';

import PartialUser from '@users/infra/validators/PartialUser';
import TypeUserParams from '@users/infra/validators/TypeUserParams';

import CreateUserUseCase from './CreateUserUseCase';

@injectable()
export default class CreateUserController implements IController {
  constructor(
    @inject('CreateUserUseCase')
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    await this.createUserUseCase.execute(request.params.type_id, request.body);

    response.status(201).send();
  }

  async validate(request: Request): Promise<void> {
    await validateParams(TypeUserParams, request.params);
    await validateObject(PartialUser, request.body);
  }
}
