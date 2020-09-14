import { injectable, inject } from 'tsyringe';

import appConfig from '~/config/app';
import NoPermissionException from '~/exceptions/NoPermissionException';
import ResourceAlreadyExistsException from '~/exceptions/ResourceAlreadyExistsException';
import IMailProvider from '~/providers/MailProvider/IMailProvider';
import IUseCase from '~/types/IUseCase';

import IRegisterTokenDTO from '@users/dtos/IRegisterTokenDTO';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import IVerifyEmailDTO from './VerifyEmailDTO';

@injectable()
export default class VerifyEmailUseCase implements IUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('PartialUserRepository')
    private partialUserRepository: IPartialUserRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({ email }: IVerifyEmailDTO): Promise<void> {
    const userExists = await this.userRepository.findByEmail(email);

    if (userExists) throw new ResourceAlreadyExistsException('User');

    const partialUser = await this.partialUserRepository.findByEmail(email);

    if (!partialUser) throw new NoPermissionException();

    const token = await this.tokenProvider.generateToken<IRegisterTokenDTO>({
      id: partialUser.id,
      email: partialUser.email,
    });

    this.mailProvider.sendMail({
      to: {
        name: undefined,
        email,
      },

      subject: 'There is your register link!',

      template: {
        file: 'modules/users/views/verifyEmail.hbs',
        context: {
          baseUrl: appConfig.baseUrl,
          token,
        },
      },
    });
  }
}
