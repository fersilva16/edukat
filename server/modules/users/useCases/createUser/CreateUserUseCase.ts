import { injectable, inject } from 'tsyringe';

import appConfig from '~/config/app';
import NoPermissionException from '~/exceptions/NoPermissionException';
import ResourceAlreadyExistsException from '~/exceptions/ResourceAlreadyExistsException';
import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IMailProvider from '~/providers/MailProvider/IMailProvider';
import type { IUseCase } from '~/types';

import IRegisterTokenDTO from '@users/dtos/IRegisterTokenDTO';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';
import ITypeRepository from '@users/repositories/TypeRepository/ITypeRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import CreateUserDTO from './CreateUserDTO';

@injectable()
export default class CreateUserUseCase implements IUseCase {
  constructor(
    @inject('PartialUserRepository')
    private partialUserRepository: IPartialUserRepository,

    @inject('TypeRepository')
    private typeRepository: ITypeRepository,

    @inject('UserRepository')
    private userRepository: IUserRepository,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({ userType, ...data }: CreateUserDTO): Promise<void> {
    const userExists = await this.userRepository.findByEmail(data.email)
      || await this.partialUserRepository.findByEmail(data.email);

    if (userExists) throw new ResourceAlreadyExistsException('User');

    const type = await this.typeRepository.findById(data.typeId);

    if (!type) throw new ResourceNotFoundException('Type');

    if (type.position < userType.position) throw new NoPermissionException();

    const { id, firstname, email } = await this.partialUserRepository.create(data);

    const token = await this.tokenProvider.generateToken<IRegisterTokenDTO>({ id, email });

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
