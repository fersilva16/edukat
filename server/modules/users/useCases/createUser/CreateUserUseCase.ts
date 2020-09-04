import { injectable, inject } from 'tsyringe';

import ResourceAlreadyExistsException from '~/exceptions/ResourceAlreadyExistsException';
import IMailProvider from '~/providers/MailProvider/IMailProvider';

import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import ICreateUserDTO from './CreateUserDTO';

@injectable()
export default class CreateUserUseCase {
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

  async execute(type: string, data: ICreateUserDTO): Promise<void> {
    const userExists = await this.partialUserRepository.findByEmail(data.email)
      || await this.userRepository.findByEmail(data.email);

    if (userExists) throw new ResourceAlreadyExistsException('User');

    const { id } = await this.partialUserRepository.create({
      ...data,

      typeId: type,
    });

    const token = await this.tokenProvider.generateToken({ id, email: data.email });

    this.mailProvider.sendMail({
      from: {
        name: 'Edukat',
        email: 'contact@edukat.com.br',
      },

      to: {
        name: data.firstname,
        email: data.email,
      },

      subject: 'You have been invite to Edukat',

      template: {
        file: 'modules/users/views/invite.hbs',
        context: {
          token,
        },
      },
    });
  }
}
