import { injectable, inject } from 'tsyringe';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IUseCase from '~/types/IUseCase';

import IRegisterTokenDTO from '@users/dtos/IRegisterTokenDTO';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import RegisterDTO from './RegisterDTO';

@injectable()
export default class RegisterUseCase implements IUseCase {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('PartialUserRepository')
    private partialUserRepository: IPartialUserRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ token, ...data }: RegisterDTO): Promise<void> {
    const { id, email } = await this.tokenProvider.parseToken<IRegisterTokenDTO>(token);

    const partialUser = await this.partialUserRepository.findById(id);

    if (!partialUser) throw new ResourceNotFoundException('Partial user');

    if (partialUser.email !== email) throw new InvalidTokenException();

    await this.partialUserRepository.delete(partialUser.id);

    await this.userRepository.create({
      firstname: partialUser.firstname || data.firstname,
      lastname: partialUser.lastname || data.lastname,

      email,
      password: data.password,

      typeId: partialUser.typeId,
    });
  }
}
