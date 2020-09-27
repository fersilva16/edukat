import { injectable, inject } from 'tsyringe';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import { IUseCase } from '~/types';

import IRegisterDataDTO from '@users/dtos/IRegisterDataDTO';
import IRegisterTokenDTO from '@users/dtos/IRegisterTokenDTO';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';

import ShowRegisterDataDTO from './ShowRegisterDataDTO';

@injectable()
export default class ShowRegisterDataUseCase implements IUseCase {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('PartialUserRepository')
    private partialUserRepository: IPartialUserRepository,
  ) {}

  async execute({ token }: ShowRegisterDataDTO): Promise<IRegisterDataDTO> {
    const { id, email } = await this.tokenProvider.parseToken<IRegisterTokenDTO>(token);

    const partialUser = await this.partialUserRepository.findById(id);

    if (!partialUser) throw new ResourceNotFoundException('Partial User');

    if (partialUser.email !== email) throw new InvalidTokenException();

    return {
      firstname: partialUser.firstname,
      lastname: partialUser.lastname,
    };
  }
}
