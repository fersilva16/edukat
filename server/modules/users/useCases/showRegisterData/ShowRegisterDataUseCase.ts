import { injectable, inject } from 'tsyringe';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IRegisterDataDTO from '~/modules/users/dtos/IRegisterDataDTO';
import IUseCase from '~/types/IUseCase';

import IRegisterTokenDTO from '@users/dtos/IRegisterTokenDTO';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';
import IShowRegisterDataDTO from '@users/useCases/showRegisterData/ShowRegisterDataDTO';

@injectable()
export default class ShowRegisterDataUseCase implements IUseCase {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('PartialUserRepository')
    private partialUserRepository: IPartialUserRepository,
  ) {}

  async execute({ token }: IShowRegisterDataDTO): Promise<IRegisterDataDTO> {
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
