import { injectable, inject } from 'tsyringe';

import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IUseCase from '~/types/IUseCase';

import IRememberMeTokenDTO from '@users/dtos/IRememberMeTokenDTO';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import RememberUserDTO from './RememberUserDTO';
import IRememberMeResultDTO from './RememberUserResultDTO';

@injectable()
export default class RememberUserUseCase implements IUseCase {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ token }: RememberUserDTO): Promise<IRememberMeResultDTO> {
    const { id } = await this.tokenProvider.parseToken<IRememberMeTokenDTO>(token);

    const user = await this.userRepository.findById(id);

    if (!user) throw new ResourceNotFoundException('User');

    return {
      email: user.email,
    };
  }
}
