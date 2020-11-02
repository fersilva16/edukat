import { injectable, inject } from 'tsyringe';

import InvalidCredentialsException from '~/exceptions/InvalidCredentialsException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IUseCase from '~/types/IUseCase';

import IForgotPasswordTokenDTO from '@users/dtos/IForgotPasswordTokenDTO';
import IHashProvider from '@users/providers/HashProvider/IHashProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import ResetPasswordDTO from './ResetPasswordDTO';

@injectable()
export default class ResetPasswordUseCase implements IUseCase {
  constructor(
    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ token, oldPassword, newPassword }: ResetPasswordDTO): Promise<void> {
    const { id } = await this.tokenProvider.parseToken<IForgotPasswordTokenDTO>(token);

    const user = await this.userRepository.findById(id);

    if (!user) throw new ResourceNotFoundException('User');

    const isPasswordEqual = await this.hashProvider.verify(user.password, oldPassword);

    if (!isPasswordEqual) throw new InvalidCredentialsException('Old password');

    await this.userRepository.update(user.id, {
      password: newPassword,
    });
  }
}
