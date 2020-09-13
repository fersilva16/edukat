import { injectable, inject } from 'tsyringe';

import appConfig from '~/config/app';
import ResourceAlreadyExistsException from '~/exceptions/ResourceAlreadyExistsException';
import IMailProvider from '~/providers/MailProvider/IMailProvider';
import IUseCase from '~/types/IUseCase';

import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import ICreateUserDTO from './CreateUserDTO';

@injectable()
export default class CreateUserUseCase implements IUseCase {
  constructor(
    @inject('PartialUserRepository')
    private partialUserRepository: IPartialUserRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: ICreateUserDTO): Promise<void> {
    const userExists = await this.partialUserRepository.findByEmail(data.email)
      || await this.userRepository.findByEmail(data.email);

    if (userExists) throw new ResourceAlreadyExistsException('User');

    const { id, firstname, email } = await this.partialUserRepository.create(data);

    const token = await this.tokenProvider.generateToken({ id, email });

    this.mailProvider.sendMail({
      to: {
        name: firstname,
        email,
      },

      subject: 'You have been invite to Edukat',

      template: {
        file: 'modules/users/views/invite.hbs',
        context: {
          baseUrl: appConfig.baseUrl,
          token,
        },
      },
    });
  }
}
