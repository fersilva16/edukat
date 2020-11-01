import faker from 'faker';
import { Factory } from 'rosie';

import ResourceNotFoundException from '~/exceptions/ResourceNotFoundException';
import IMailProvider from '~/providers/MailProvider/IMailProvider';
import FakeMailProvider from '~/providers/MailProvider/implementations/fakes/FakeMailProvider';

import FakeTokenProvider from '@users/providers/TokenProvider/implementations/fakes/FakeTokenProvider';
import ITokenProvider from '@users/providers/TokenProvider/ITokenProvider';
import FakeUserRepository from '@users/repositories/UserRepository/implementations/fakes/FakeUserRepository';
import IUserRepository from '@users/repositories/UserRepository/IUserRepository';

import ForgotPasswordUseCase from './ForgotPasswordUseCase';

describe('ForgotPasswordUseCase', () => {
  let forgotPasswordUseCase: ForgotPasswordUseCase;
  let userRepository: IUserRepository;
  let tokenProvider: ITokenProvider;
  let mailProvider: IMailProvider;

  beforeAll(() => {
    userRepository = new FakeUserRepository();
    tokenProvider = new FakeTokenProvider();
    mailProvider = new FakeMailProvider();

    forgotPasswordUseCase = new ForgotPasswordUseCase(
      userRepository,
      tokenProvider,
      mailProvider,
    );
  });

  beforeEach(async () => {
    await userRepository.clear();
  });

  it('should be send mail to user with token', async () => {
    const { id, email } = await userRepository.create(Factory.build('user'));

    const findByEmail = jest.spyOn(userRepository, 'findByEmail');
    const generateToken = jest.spyOn(tokenProvider, 'generateToken');
    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await forgotPasswordUseCase.execute({ email });

    expect(findByEmail).toHaveBeenCalledWith(email);

    expect(generateToken).toHaveBeenCalledWith({ id });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be fail if user not exists', async () => {
    const email = faker.internet.email();

    expect(
      forgotPasswordUseCase.execute({ email }),
    ).rejects.toBeInstanceOf(ResourceNotFoundException);
  });
});
