import { Request, Response } from 'express';
import { injectable, inject } from 'tsyringe';

import validateObject from '~/utils/validate/object';
import validateParams from '~/utils/validate/params';

import PartialUser from '@users/infra/validators/PartialUser';
import TypeUserParams from '@users/infra/validators/TypeUserParams';

import CreateUserUseCase from './CreateUserUseCase';

@injectable()
export default class CreateUserController {
  constructor(
    @inject('CreateUserUseCase')
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<void> {
    console.log(request.params);

    const params = await validateParams(TypeUserParams, request.params);
    const partialUser = await validateObject(PartialUser, request.body);

    await this.createUserUseCase.execute(params.type_id, partialUser);

    response.status(201).send();
  }
}
