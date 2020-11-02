import { injectable, inject } from 'tsyringe';

import appConfig from '~/config/app';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IMailProvider from '~/providers/MailProvider/IMailProvider';
import IUseCase from '~/types/IUseCase';

import IForgotPasswordTokenDTO from '@users/dtos/IForgotPasswordTokenDTO';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import ForgotPasswordDTO from './ForgotPasswordDTO';

@injectable()
export default class ForgotPasswordUseCase implements IUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({ email }: ForgotPasswordDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new ResourceNotFoundException('User');

    const token = await this.tokenProvider.generateToken<IForgotPasswordTokenDTO>({ id: user.id });

    this.mailProvider.sendMail({
      to: {
        name: user.firstname,
        email,
      },

      subject: 'Reset password',

      template: {
        file: 'modules/users/views/forgotPassword.hbs',
        context: {
          baseUrl: appConfig.baseUrl,
          token,
        },
      },
    });
  }
}
