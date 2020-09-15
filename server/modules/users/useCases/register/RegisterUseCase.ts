import { injectable, inject } from 'tsyringe';

import InvalidTokenException from '~/exceptions/InvalidTokenException';
import ResourceAlreadyExistsException from '~/exceptions/ResourceAlreadyExistsException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IUseCase from '~/types/IUseCase';

import IRegisterTokenDTO from '@users/dtos/IRegisterTokenDTO';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import IRegisterDTO from './RegisterDTO';

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

  async execute({ token, ...data }: IRegisterDTO): Promise<void> {
    const { id, email } = await this.tokenProvider.parseToken<IRegisterTokenDTO>(token);

    const user = await this.userRepository.findByEmail(email);

    if (user) throw new ResourceAlreadyExistsException('User');

    const partialUser = await this.partialUserRepository.findById(id);

    if (!partialUser) throw new ResourceNotFoundException('Partial user');

    if (partialUser.email !== email) throw new InvalidTokenException();

    await this.partialUserRepository.delete(partialUser.id);

    await this.userRepository.create({
      firstname: partialUser.firstname || data.firstname,
      lastname: partialUser.lastname || data.lastname,

      email,
      password: data.password,

      typeId: partialUser.type_id,
    });
  }
}
