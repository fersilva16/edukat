import faker from 'faker';
import { Factory } from 'rosie';

import NoPermissionException from '~/exceptions/NoPermissionException';
import ResourceAlreadyExistsException from '~/exceptions/ResourceAlreadyExistsException';
import IMailProvider from '~/providers/MailProvider/IMailProvider';
import FakeMailProvider from '~/providers/MailProvider/implementations/fakes/FakeMailProvider';

import FakeTokenProvider from '@users/providers/TokenProvider/implementations/fakes/FakeTokenProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import FakePartialUserRepository from '@users/repositories/PartialUserRepository/implementations/fakes/FakePartialUserRepository';
import IPartialUserRepository from '@users/repositories/PartialUserRepository/IPartialUserRepository';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';
import VerifyEmailUseCase from '@users/useCases/verifyEmail/VerifyEmailUseCase';

describe('VerifyEmailUseCase', () => {
  let userRepository: IUserRepository;
  let partialUserRepository: IPartialUserRepository;
  let tokenProvider: ITokenProvider;
  let mailProvider: IMailProvider;
  let verifyEmailUseCase: VerifyEmailUseCase;

  beforeAll(() => {
    userRepository = new FakeUserRepository();
    partialUserRepository = new FakePartialUserRepository();
    tokenProvider = new FakeTokenProvider();
    mailProvider = new FakeMailProvider();

    verifyEmailUseCase = new VerifyEmailUseCase(
      userRepository,
      partialUserRepository,
      tokenProvider,
      mailProvider,
    );
  });

  beforeEach(async () => {
    await userRepository.clear();
    await partialUserRepository.clear();
  });

  it('should be verify email', async () => {
    const userFindByEmail = jest.spyOn(userRepository, 'findByEmail');
    const partialUserFindByEmail = jest.spyOn(partialUserRepository, 'findByEmail');
    const generateToken = jest.spyOn(tokenProvider, 'generateToken');
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    const { email } = await partialUserRepository.create(Factory.build('partialUser'));

    await verifyEmailUseCase.execute({ email });

    expect(userFindByEmail).toHaveBeenCalledWith(email);

    expect(partialUserFindByEmail).toHaveBeenCalledWith(email);

    expect(generateToken).toHaveBeenCalled();

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be fail when user exists', async () => {
    const { email } = await userRepository.create(Factory.build('user'));

    expect(
      verifyEmailUseCase.execute({ email }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExistsException);
  });

  it('should be fail when partial user not exists', async () => {
    const email = faker.internet.email();

    expect(
      verifyEmailUseCase.execute({ email }),
    ).rejects.toBeInstanceOf(NoPermissionException);
  });
});
